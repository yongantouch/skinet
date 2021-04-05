using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;
        public OrderService(IUnitOfWork unitOfWork,
                            IBasketRepository basketRepo,
                            IPaymentService paymentService)
        {
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
            _paymentService = paymentService;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            //get basket from repo
            var basket = await _basketRepo.GetBasketAsyn(basketId);

            //get item from the product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsyn(item.Id);
                var itemOrder = new ProductItemOrdered(productItem.Id, productItem.Name,
                productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrder, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            //get delivery method from the repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsyn(deliveryMethodId);

            //cal subtotal
            var subtotal = items.Sum(item => item.Quantity * item.Price);

            //check to see if order exists
            var spec = new OrderbyPayementIntentIdSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if(existingOrder !=null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }

            //create the order
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);

            //TODO: save to db
            var result = await _unitOfWork.Complete();

            if(result == 0) return null;

            //delete basket
            // await _basketRepo.DeleteBasketAsyn(basketId);

            //return order
            return order;
        }


        public async Task<IReadOnlyList<DeliveryMethod>> GetDiliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync();
        }

        public async Task<Order> GetOrderByIdAsyn(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrdering(id, buyerEmail);
            
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrderForUserAsyn(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrdering(buyerEmail);
            
            return await _unitOfWork.Repository<Order>().ListAsyn(spec);
        }
    }
}