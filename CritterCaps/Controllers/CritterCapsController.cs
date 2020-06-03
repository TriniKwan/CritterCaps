using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CritterCaps.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CritterCaps.Controllers
{
    [Route("api/crittercaps")]
    [ApiController]
    public class CritterCapsController : ControllerBase
    {
        [HttpGet("products")]
        public IActionResult GetAllProducts()
        {
            var repo = new ProductRepository();
            var result = repo.GetAllProducts();
            if(!result.Any())
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

        [HttpGet("product/{productId}")]
        public IActionResult GetSingleProduct(int productId)
        {
            var repo = new ProductRepository();
            var result = repo.GetSingleProduct(productId);
            if (result == null)
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

    }
}