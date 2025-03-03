using Domain.DTOs;
using Domain.Models;
using Domain.Repository;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly CategoryService _categoryService;

    public CategoriesController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public IEnumerable<CategoryDTO> GetAll()
    {
        return _categoryService.List();
    }
}
