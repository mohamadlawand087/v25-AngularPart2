using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using DemoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController: ControllerBase
    {
        private static readonly List<User> users = new List<User>()
        {
           new User {
               cookingRating = 3,
               country = "LB",
               email = "mohamad@email.com",
               fullName = "Mohamad Talal Lawand",
               phone = 99889988,
               userId = 1
           },
           new User {
               cookingRating = 5,
               country = "US",
               email = "richard@email.com",
               fullName = "Richard Feynman",
               phone = 0000000,
               userId = 2
           },
           new User {
               cookingRating = 3,
               country = "US",
               email = "neil@email.com",
               fullName = "Neil Degrass Tyson",
               phone = 1445566,
               userId = 2
           }
        };

        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var usersJson = JsonSerializer.Serialize(users);
            return Ok(usersJson);
        }
    }
}