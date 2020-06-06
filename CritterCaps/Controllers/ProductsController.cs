﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CritterCaps.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CritterCaps.Controllers
{
    [Route("api/crittercaps/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        ProductRepository _productRepository;

        public ProductsController(ProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        //Get All Products
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var result = _productRepository.GetAllProducts();
            if (!result.Any())
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
    }
}
