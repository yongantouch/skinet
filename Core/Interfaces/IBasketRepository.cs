using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        
        Task<CustomerBasket> GetBasketAsyn(string basketId);
        Task<CustomerBasket> UpdateBasketAsyn(CustomerBasket customerBasket);
        Task<bool> DeleteBasketAsyn(string basketId);
    }
}