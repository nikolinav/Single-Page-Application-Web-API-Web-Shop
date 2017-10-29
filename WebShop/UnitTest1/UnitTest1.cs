using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WebShop.Models;
using WebShop.Interface;
using WebShop.Controllers;
using System.Web.Http;
using System.Web.Http.Results;
using System.Net;

namespace WebShop.Tests
{

    [TestClass]
    public class UnitTest1
    {

        [TestMethod]
        public void GetReturnsProductWithSameId()
        {
            // Arrange
            var mockRepository = new Mock<IProductsRepository<Product>>();
            mockRepository.Setup(x => x.GetById(13)).Returns(new Product { Id = 13 });

            var controller = new ProductController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.GetProduct(13);
            var contentResult = (OkNegotiatedContentResult<ProductDetailDTO>)actionResult;//nece da prodje zbog mapper-a

            // Assert
            Assert.IsNotNull(contentResult);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual(13, contentResult.Content.Id);
        }


        [TestMethod]
        public void GetReturnsNotFound()
        {
            // Arrange
            var mockRepository = new Mock<IProductsRepository<Product>>();
            var controller = new ProductController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.GetProduct(25);

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeleteReturnsOk()
        {
            // Arrange
            var mockRepository = new Mock<IProductsRepository<Product>>();
            mockRepository.Setup(x => x.GetById(25)).Returns(new Product { Id = 25 });
            var controller = new ProductController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.DeleteProduct(25);

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(OkResult));
        }
        [TestMethod]
        public void PostMethodSetsLocationHeader()
        {
            // Arrange
            var mockRepository = new Mock<IProductsRepository<Product>>();
            var controller = new ProductController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.PostProduct(new Product { Id = 25, Name = "Movie1" });
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<Product>;

            // Assert
            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.AreEqual(25, createdResult.RouteValues["id"]);
        }

        [TestMethod]
        public void PutCategoryReturnsContentResult()
        {
            //Arrange
            var mockRepository = new Mock<IProductsRepository<ProductCategory>>();
            var controller = new ProductCategoryController(mockRepository.Object);

            var testItem = new ProductCategory() { Id = 3, Name = "Demo name" };


            //Act
            IHttpActionResult actionResult = controller.PutProductCategory(testItem.Id, testItem);

            //Assert
            Assert.IsNotNull(actionResult);
            Assert.IsInstanceOfType(actionResult, typeof(OkNegotiatedContentResult<ProductCategory>));

        }

        [TestMethod]
        public void PutCategoryShouldFailIfDifferentId()
        {
            //Arrange
            var mockRepository = new Mock<IProductsRepository<ProductCategory>>();
            var controller = new ProductCategoryController(mockRepository.Object);

            var testItem = new ProductCategory() { Id = 3, Name = "Demo name" };

            //Act
            IHttpActionResult actionResult = controller.PutProductCategory(1, testItem);

            //Assert
            Assert.IsInstanceOfType(actionResult, typeof(BadRequestResult));
        }
}
}
