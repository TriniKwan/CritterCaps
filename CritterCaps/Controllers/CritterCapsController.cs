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
        ProductTypesRepository _productTypesRepository;
        ProductRepository _productRepository; 
        UserRepository _UserRepository;

        public CritterCapsController(ProductTypesRepository productTypesRepository, ProductRepository productRepository, UserRepository userRepository)
        {
            _productTypesRepository = productTypesRepository;
            _productRepository = productRepository;
            _UserRepository = userRepository;
        }

        [HttpGet("productTypes")]
        public IActionResult GetAllProductTypes()
        {
            var result = _productTypesRepository.GetAllProductTypes();
            return Ok(result);
        }

        [HttpGet("productType/{productType}")]
        public IActionResult GetSingleProductType(string productType)
        {
            var result = _productTypesRepository.GetSingleProductType(productType);
            if (result == null)
            {
                return NotFound("Oops! We haven't had time to craft that type of hat.");
            }
            return Ok(result);
        }
        [HttpGet("products")]
        public IActionResult GetAllProducts()
        {
            var result = _productRepository.GetAllProducts();
            if(!result.Any())
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

        [HttpGet("product/{productId}")]
        public IActionResult GetSingleProduct(int productId)
        {
            var result = _productRepository.GetSingleProduct(productId);
            if (result == null)
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

// GET ALL USERS ////
        [HttpGet("user")]
        public IActionResult GetAllUsers()
        {
            var result = _UserRepository.GetAllUsers();
            if (!result.Any())
            {
                return NotFound("No users available");
            }

            return Ok(result);
        }

        [HttpGet("animals")]
        public IActionResult GetAllAnimals()
        {
            var repo = new AnimalRepository();
            var result = repo.GetAllAnimals();
            if (!result.Any())
            {
                return NotFound("We don't like those animals");
            }

            return Ok(result);
        }

        [HttpGet("animal/{animalType}")]
        public IActionResult GetSingleAnimal(string animalType)
        {
            var repo = new AnimalRepository();
            var result = repo.GetSingleAnimal(animalType);
            if (result == null)
            {
                return NotFound("Your animal doesn't exist here");
            }

            return Ok(result);
        }
    }
}