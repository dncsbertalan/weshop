using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartsController : ControllerBase
{
    private readonly ICartRepository cartRepository;

    public CartsController(ICartRepository cartRepository)
    {
        this.cartRepository = cartRepository;
    }

    [HttpGet("{id}")]
    public ActionResult<Cart> Get(int id)
    {
        var cart = cartRepository.GetById(id);
        return cart != null ? Ok(cart) : NotFound();
    }
}
