using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CritterCaps.DataAccess;

namespace CritterCaps.Controllers
{
    [Route("api/critterCaps")]
    [ApiController]
    public class CritterCapsController : ControllerBase
    {
        CritterCapsRepository _repository;

        public CritterCapsController(CritterCapsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("productTypes")]
        public IActionResult GetAllProductTypes()
        {
            var result = _repository.GetAllProductTypes();
            return Ok(result);
        }

        [HttpGet("productType/{productType}")]
        public IActionResult GetSingleProductType(string productType)
        {
            var result = _repository.GetSingleProductType(productType);
            if (result == null)
            {
                return NotFound("Oops! We haven't had time to craft that type of hat.");
            }
            return Ok(result);
        }
    }
}