using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderbyPayementIntentIdSpecification : BaseSpecfication<Order>
    {
        public OrderbyPayementIntentIdSpecification(string paymentIntentId)
        : base(o => o.PaymentIntentId == paymentIntentId)
        {

        }
    }
}