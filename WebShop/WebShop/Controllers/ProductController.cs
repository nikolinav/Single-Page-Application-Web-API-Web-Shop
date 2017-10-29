using AutoMapper;
using AutoMapper.QueryableExtensions;
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
    public class ProductController : ApiController
    {

        IProductsRepository<Product> _repository;

        public ProductController(IProductsRepository<Product> repository)
        {
            _repository = repository;
        }

        public IQueryable<ProductDTO> GetProducts()
        {
            return _repository.GetAll().AsQueryable().ProjectTo<ProductDTO>();
        }

        public IQueryable<Product> GetProductsByPrice(decimal p)
        {
            return ((ProductRepository)_repository).GetAllByPrice(p).AsQueryable();
        }

        public IQueryable<Product> GetProducts(int y)
        {
            return ((ProductRepository)_repository).GetAllWithCategory(y).AsQueryable();
        }

        [ResponseType(typeof(ProductDetailDTO))]
        public IHttpActionResult GetProduct(int id)
        {
            Product product = _repository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<ProductDetailDTO>(product));
        }

        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Add(product);


            return CreatedAtRoute("DefaultApi", new { id = product.Id }, product);
        }

        [ResponseType(typeof(Product))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.Id)
            {
                return BadRequest();
            }

            _repository.Update(product);
            return Ok(product);
        }
        
        [ResponseType(typeof(void))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = _repository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }

            _repository.Delete(product);

            return Ok();
        }

    }
}
