using System.Linq;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery,
                                                   ISpecification<TEntity> spec)
        {
            var query = inputQuery;
            
            if(spec.Criterial!=null)
            {
                query = query.Where(spec.Criterial);
            }

            if(spec.Orderby!=null)
            {
                query = query.OrderBy(spec.Orderby);
            }

            if(spec.OrderbyDescending!=null)
            {
                query = query.OrderByDescending(spec.OrderbyDescending);
            }

            if(spec.isPagingEnabled)
            {
                query = query.Skip(spec.Skip).Take(spec.Take);
            }

            query = spec.Include.Aggregate(query,(current, inlcude)=> current.Include(inlcude));

            return query;
        }
    }
}