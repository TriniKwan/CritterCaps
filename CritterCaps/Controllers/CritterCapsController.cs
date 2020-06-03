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
        CritterCapsRepository _repository = new CritterCapsRepository();

        [HttpGet("productType")]
        public IActionResult GetAllProductTypes()
        {
            var result = _repository.GetAllProductTypes();
            return Ok(result);
        }
    }
}