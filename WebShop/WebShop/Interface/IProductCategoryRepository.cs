using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShop.Models;

namespace WebShop.Interface
{
    public interface IProductCategoryRepository
    {
        IEnumerable<ProductCategory> GetAll();
        ProductCategory GetById(int id);
        void Add(ProductCategory productCategory);
        void Delete(ProductCategory productCategory);
        void Update(ProductCategory productCategory);
    }
}
