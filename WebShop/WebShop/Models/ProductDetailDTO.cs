using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebShop.Models
{
    public class ProductDetailDTO
    {

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string ProductCategoryName { get; set; }



    }
}