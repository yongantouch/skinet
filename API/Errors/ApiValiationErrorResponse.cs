using System.Collections.Generic;

namespace API.Errors
{
    public class ApiValiationErrorResponse : ApiResponse
    {
        public ApiValiationErrorResponse() : base(400)
        {
        }
        public IEnumerable<string> Errors { get; set; }
    }
}