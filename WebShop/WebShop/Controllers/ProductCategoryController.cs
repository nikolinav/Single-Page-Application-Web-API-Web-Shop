using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebShop.Interface;
using WebShop.Models;
using WebShop.Repository;

namespace WebShop.Controllers
{
    public class ProductCategoryController : ApiController
    {

        IProductsRepository<ProductCategory> _repository;

        public ProductCategoryController(IProductsRepository<ProductCategory> repository)
        {
            _repository = repository;
        }

        public ProductCategoryController()
        {
           
        }

        public IQueryable<ProductCategory> GetProductCategories()
        {
            return ((ProductCategoryRepository)_repository).GetAll().AsQueryable();
        }

        [ResponseType(typeof(ProductCategory))]
        public IHttpActionResult GetProductCategory(int id)
        {
            ProductCategory productCategory = _repository.GetById(id);
            if (productCategory == null)
            {
                return NotFound();
            }

            return Ok(productCategory);
        }

        [ResponseType(typeof(ProductCategory))]
        public IHttpActionResult PostProductCategory(ProductCategory productCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Add(productCategory);


            return CreatedAtRoute("DefaultApi", new { id = productCategory.Id }, productCategory);
        }

        [ResponseType(typeof(ProductCategory))]
        public IHttpActionResult PutProductCategory(int id, ProductCategory productCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productCategory.Id)
            {
                return BadRequest();
            }

            _repository.Update(productCategory);
            return Ok(productCategory);
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult DeleteProductCategory(int id)
        {
            ProductCategory productCategory = _repository.GetById(id);
            if (productCategory == null)
            {
                return NotFound();
            }

            _repository.Delete(productCategory);

            return Ok();
        }
    }
}
