namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebShop.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<WebShop.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebShop.Models.ApplicationDbContext context)
        {

            context.ProductCategories.AddOrUpdate(x => x.Id,
                 new ProductCategory() { Id = 1, Name = "Hrana"},
                 new ProductCategory() { Id = 2, Name = "Odeca"},
                 new ProductCategory() { Id = 3, Name = "Tehnika"}
                 );
            context.Products.AddOrUpdate(x => x.Id,
                 new Product() { Id = 1, Name = "Mikrotalasna", Price = 10000, ProductCategoryId = 3},
                 new Product() { Id = 2, Name = "Jabuke", Price = 2000,  ProductCategoryId = 1 },
                 new Product() { Id = 3, Name = "Majica", Price = 300,  ProductCategoryId = 2 },
                 new Product() { Id = 4, Name = "Suknja", Price = 350, ProductCategoryId = 2 },
                 new Product() { Id = 5, Name = "Carape", Price = 150, ProductCategoryId = 2 }
                 );
        }
    }
}
