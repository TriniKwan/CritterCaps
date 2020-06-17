using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CritterCaps.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CritterCaps.Controllers
{
    [Route("api/crittercaps/productTypes")]
    [ApiController]
    public class ProductTypesController : ControllerBase
    {
        ProductTypesRepository _productTypesRepository;

        public ProductTypesController(ProductTypesRepository productTypesRepository)
        {
            _productTypesRepository = productTypesRepository;
        }

        [HttpGet]
        public IActionResult GetAllProductTypes()
        {
            var result = _productTypesRepository.GetAllProductTypes();
            return Ok(result);
        }

        [HttpGet("productType/{productType}")]
        public IActionResult GetSingleProductTypeWithProducts(int productType)
        {
            var result = _productTypesRepository.GetSingleProductTypeWithProducts(productType);
            if (result == null)
            {
                return NotFound("Oops! We haven't had time to craft that type of hat.");
            }
            return Ok(result);
        }
    }
}
