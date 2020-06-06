using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CritterCaps.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CritterCaps.Controllers
{
    [Route("api/crittercaps/paymentType")]
    [ApiController]
    public class PaymentTypeController : ControllerBase
    {
        public PaymentTypeRepository _paymentTypeRepository;

        public PaymentTypeController(PaymentTypeRepository paymentTypeRepository)
        {
            _paymentTypeRepository = paymentTypeRepository;
        }

        
        [HttpGet("{paymentId}")]
        public IActionResult GetSinglePaymentTypeById(int paymentId)
        {
            var paymentType = _paymentTypeRepository.GetPaymentTypeById(paymentId);

            if (paymentType == null) return NotFound("No such payment type found");

            return Ok(paymentType);
        }
    }
}
