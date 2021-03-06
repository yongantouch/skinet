using System.Runtime.CompilerServices;
using System;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AutoMapper;
using API.Helpers;
using API.Middleware;
using System.Linq;
using API.Errors;
using Microsoft.OpenApi.Models;
using API.Extensions;
using StackExchange.Redis;
using Infrastructure.Data.Identity;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();
            services.AddDbContext<StoreContext>(x => 
                x.UseSqlite(_config.GetConnectionString("DefaultConnection")));
            services.AddDbContext<AppIdentityDbContext>(x =>{
                x.UseSqlite(_config.GetConnectionString("IdentityConnection"));
            });
            services.AddSingleton<IConnectionMultiplexer>(c => {
                var configuration = ConfigurationOptions
                .Parse(_config.GetConnectionString("Redis"),true);
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddApplicationService();
            services.AddIdentityServices(_config);
            services.AddSwaggerDocumention();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy=>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseSwaggerDocumentation();

            // if (env.IsDevelopment())
            // {

            //     //app.UseDeveloperExceptionPage();
            //     app.UseSwagger();
            //     app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1"));
            // }

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
