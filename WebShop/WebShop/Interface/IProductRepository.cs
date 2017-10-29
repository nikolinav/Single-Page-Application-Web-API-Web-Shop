using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShop.Models;

namespace WebShop.Interface
{
    public interface IProductsRepository<T>
    {

        IEnumerable<T> GetAll();
        T GetById(int id);
        void Add(T t);
        void Update(T t);
        void Delete(T t);


        //IEnumerable<Product> GetAll();
        //IEnumerable<Product> GetAllWithCategory(int productCategory);
        //Product GetById(int id);
        //void Add(Product product);
        //void Delete(Product product);
        //void Update(Product product);
    }
}
