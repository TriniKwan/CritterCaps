using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CritterCaps.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CritterCaps.Controllers
{
    [Route("api/crittercaps/animals")]
    [ApiController]
    public class AnimalTypesController : ControllerBase
    {
        AnimalRepository _animalRepository;

        public AnimalTypesController(AnimalRepository animalRepository)
        {
            _animalRepository = animalRepository;
        }

        [HttpGet]
        public IActionResult GetAllAnimals()
        {
            var result = _animalRepository.GetAllAnimals();
            if (!result.Any())
            {
                return NotFound("We don't like those animals");
            }

            return Ok(result);
        }

        [HttpGet("animal/{animalType}")]
        public IActionResult GetSingleAnimal(string animalType)
        {
            var result = _animalRepository.GetSingleAnimal(animalType);
            if (result == null)
            {
                return NotFound("Your animal doesn't exist here");
            }

            return Ok(result);
        }
    }
}
