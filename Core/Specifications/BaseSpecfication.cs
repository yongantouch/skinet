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

        public Expression<Func<T, object>> Orderby  {get; private set;}

        public Expression<Func<T, object>> OrderbyDescending {get; private set;}

        public int Take {get; private set;}

        public int Skip {get; private set;}

        public bool isPagingEnabled {get; private set;}

        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Include.Add(includeExpression);
        }

        protected void AddOrderby(Expression<Func<T, object>> oderByExpression)
        {
            Orderby = oderByExpression;
        }
        protected void AddOrderbyDescending(Expression<Func<T, object>> oderByDescendingExpression)
        {
            OrderbyDescending = oderByDescendingExpression;
        }

        protected void ApplyingPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            isPagingEnabled = true;
        }
    }
}