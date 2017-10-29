using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebShop.Interface;
using WebShop.Models;

namespace WebShop.Repository
{
    public class ProductCategoryRepository : IDisposable, IProductsRepository <ProductCategory>
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<ProductCategory> GetAll()
        {
            return db.ProductCategories;
        }

        public ProductCategory GetById(int id)
        {
            return db.ProductCategories.FirstOrDefault(p => p.Id == id);
        }
        public void Add(ProductCategory productCategory)
        {
            db.ProductCategories.Add(productCategory);
            db.SaveChanges();
        }

        public void Update(ProductCategory productCategory)
        {
            db.Entry(productCategory).State = EntityState.Modified;

            db.SaveChanges();
        }

        public void Delete(ProductCategory productCategory)
        {
            db.ProductCategories.Remove(productCategory);
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