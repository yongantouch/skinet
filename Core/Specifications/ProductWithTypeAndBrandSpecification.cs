using System;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithTypeAndBrandSpecification : BaseSpecfication<Product>
    {
        public ProductWithTypeAndBrandSpecification(ProductSpecParams productParams)
        : base(x =>
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
        )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderby(x => x.Name);
            ApplyingPaging(productParams.PageSize * (productParams.PageIndex-1),productParams.PageSize);

            if(!string.IsNullOrEmpty(productParams.Sort))
            {
                switch(productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderby(x => x.Price);
                        break;
                    case "priceDesc":
                        AddOrderbyDescending(x => x.Price);
                        break;
                    default:
                        AddOrderby(x => x.Name);
                        break;
                }
            }
        }

        public ProductWithTypeAndBrandSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}