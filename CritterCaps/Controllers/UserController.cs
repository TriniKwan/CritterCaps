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
    [Route("api/crittercaps/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepository _UserRepository;

        public UserController(UserRepository userRepository)
        {
            _UserRepository = userRepository;
        }

        // GET ALL USERS ////
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var result = _UserRepository.GetAllUsers();
            if (!result.Any())
            {
                return NotFound("No users available");
            }

            return Ok(result);
        }

        // GET ONE USER ////
        [HttpGet("userId/{userId}")]
        public IActionResult GetSingleUser(int userId)
        {
            var result = _UserRepository.GetSingleUser(userId); ;
            if (result == null)
            {
                return NotFound("This is not the user you are looking for.");
            }
            return Ok(result);
        }

        // Create New User //
        [HttpPost("new")]
        public IActionResult CreateNewUser(User userToAdd)
        {
            var existingUser = _UserRepository.GetUserByUid(userToAdd.UID);
            if (existingUser == null)
            {
                var newUser = _UserRepository.Add(userToAdd);
                return Created("", newUser);
            }

            return NotFound("Could not create a new account. User already exists");
        }

    }
}
