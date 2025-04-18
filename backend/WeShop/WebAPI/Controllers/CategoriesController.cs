using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(CategoryService _categoryService) : ControllerBase
{
    [HttpGet]
    public IEnumerable<CategoryDto> GetAll()
    {
        return _categoryService.List();
    }
}
