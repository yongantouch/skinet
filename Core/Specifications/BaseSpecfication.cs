using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public class BaseSpecfication<T> : ISpecification<T>
    {
        public BaseSpecfication(Expression<Func<T, bool>> criterial)
        {
            Criterial = criterial;
        }

        public BaseSpecfication()
        {
            
        }

        public Expression<Func<T, bool>> Criterial  {get;}

        public List<Expression<Func<T, object>>> Include  {get;} =
            new List<Expression<Func<T, object>>>();
        
        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Include.Add(includeExpression);
        }
    }
}