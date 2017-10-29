using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;
using Microsoft.Practices.Unity;
using WebShop.Interface;
using WebShop.Rresolver;
using WebShop.Repository;
using WebShop.Models;
using AutoMapper;

namespace WebShop
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Tracing 
            config.EnableSystemDiagnosticsTracing();

            // CORS
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            // Unity
            var container = new UnityContainer();
            container.RegisterType<IProductsRepository<Product>, ProductRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IProductsRepository<ProductCategory>, ProductCategoryRepository>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);


            // AutoMapper
            Mapper.Initialize(cfg => {
                cfg.CreateMap<Product, ProductDTO>(); // automatski ce mapirati Author.Name u AuthorName
                                                //.ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.Name)); // ako želimo eksplicitno zadati mapranje
                cfg.CreateMap<Product, ProductDetailDTO>(); // automatski ce mapirati Author.Name u AuthorName
                                                      //.ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.Name)); // ako želimo eksplicitno zadati mapiranje
            });
        }
    }
}
