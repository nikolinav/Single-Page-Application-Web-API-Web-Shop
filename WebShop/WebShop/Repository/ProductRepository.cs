using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebShop.Interface;
using WebShop.Models;

namespace WebShop.Repository
{
    public class ProductRepository : IDisposable, IProductsRepository <Product>
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<Product> GetAll()
        {
            return db.Products.Include(p => p.ProductCategory);
        }

        public IEnumerable<Product> GetAllWithCategory(int productCategoryId)
        {
            IEnumerable<Product> products = db.Products.Where(p => p.ProductCategoryId == productCategoryId);
            return products;
        }

        public IEnumerable<Product> GetAllByPrice(decimal price)
        {
            IEnumerable<Product> products = db.Products.Where(p => p.Price < price).OrderBy(q => q.Price);
            return products;
        }

        public Product GetById(int id)
        {
            return db.Products.Include(p => p.ProductCategory).FirstOrDefault(p => p.Id == id);
        }
        public void Add(Product product)
        {
            db.Products.Add(product);
            db.SaveChanges();
        }

        public void Update(Product product)
        {
            db.Entry(product).State = EntityState.Modified;

            db.SaveChanges();
        }

       

        public void Delete(Product product)
        {
            db.Products.Remove(product);
            db.SaveChanges();
        }

        public void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        
    }
}