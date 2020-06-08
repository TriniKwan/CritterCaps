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
    [Route("api/critterCaps/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrdersRepository _ordersRepository;

        public OrderController(OrdersRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }

        //Get All Orders
        [HttpGet]
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
            if (result == null)
            {
                return NotFound("No order found");
            }

            return Ok(result);
        }

        //Create new order
        [HttpGet("order/new/userId/{userId}")]
        public IActionResult CreateNewOrder(int userId)
        {
            var existingOrder = _ordersRepository.CheckExistingOrder(userId);
            if (!existingOrder.Any())
            {
                var result = _ordersRepository.CreateNewOrder(userId);

                return Ok(result);
            }

            return NotFound("Open order already exists");
        }

        //Add items to an order
        [HttpGet("addItem/orderId/{orderId}/productId/{productId}")]
        public IActionResult AddLineItem(int orderId, int productId)
        {
            var openOrder = _ordersRepository.CheckCompletedOrder(orderId);
            if(openOrder.Any())
            {
                var result = _ordersRepository.AddLineItem(orderId, productId);

                return Ok(result);
            }

            return NotFound("That order is already completed.");
        }

        //Complete order
        [HttpGet("completeOrder/orderId/{orderId}/paymentType/{paymentType}")]
        public IActionResult CompleteOrder(int orderId, string paymentType)
        {
            var openOrder = _ordersRepository.CheckCompletedOrder(orderId);
            if (openOrder.Any())
            {
                var result = _ordersRepository.CompleteOrder(orderId, paymentType);

                return Ok(result);
            }

            return NotFound("That order is already completed.");
        }
    }
}
