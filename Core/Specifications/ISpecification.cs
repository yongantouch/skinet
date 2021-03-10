using System.Collections.Generic;
using System;
using System.Linq.Expressions;
namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criterial {get;}
        List<Expression<Func<T, object>>> Include {get;}  
    }
}