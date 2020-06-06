using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CritterCaps.Models;
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
        OrdersRepository _ordersRepository;

        public CritterCapsController(ProductTypesRepository productTypesRepository, 
                                     ProductRepository productRepository,
                                     UserRepository userRepository,
                                     OrdersRepository ordersRepository)
        {
            _productTypesRepository = productTypesRepository;
            _productRepository = productRepository;
            _UserRepository = userRepository;
            _ordersRepository = ordersRepository;
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

        //Get All Products
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

        //Get a single product
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

        //Get All Orders
        [HttpGet("orders")]
        public IActionResult GetAllOrders()
        {
            var result = _ordersRepository.GetAllOrders();
            if (!result.Any())
            {
                return NotFound("No orders available");
            }

            return Ok(result);
        }

        //Get Single Order
        [HttpGet("order/{orderId}")]
        public IActionResult GetSingleOrder(int orderId)
        {
            var result = _ordersRepository.GetSingleOrder(orderId);
            if(result == null)
            {
                return NotFound("No order found");
            }

            return Ok(result);
        }

    }
}