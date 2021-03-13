using System.Collections.Generic;
using System;
using System.Linq.Expressions;
namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criterial {get;}
        List<Expression<Func<T, object>>> Include {get;}  
        Expression<Func<T,object>> Orderby { get;}
        Expression<Func<T,object>> OrderbyDescending { get;}
        int Take {get;}
        int Skip {get;}

        bool isPagingEnabled {get;}

    }
}