using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepositoy;
        private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepositoy, IMapper mapper)
        {
            _mapper = mapper;
            _basketRepositoy = basketRepositoy;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepositoy.GetBasketAsyn(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasketAsync(CustomerBasketDto basket)
        {
            var customerBasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);

            var updateBasket = await _basketRepositoy.UpdateBasketAsyn(customerBasket);

            return Ok(updateBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRepositoy.DeleteBasketAsyn(id);
        }
    }
}