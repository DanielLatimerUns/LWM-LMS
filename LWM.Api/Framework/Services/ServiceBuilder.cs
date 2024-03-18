using System.Reflection;
using LWM.Api.ApplicationServices.Lesson.Queries;
using LWM.Authentication;

namespace LWM.Api.Framework.Services
{
    public class ServiceBuilder
    {
        private readonly static string[] _scopedServices = ["IApplicationInstanceService"];

        private readonly static string[] _singletonServices = ["IApplicationInstanceService"];

        public static void BuildServices(IServiceCollection services)
        {
            var assembly = Assembly.GetAssembly(typeof(LessonQueries));
            var authAssembly = Assembly.GetAssembly(typeof(JwtFactory));

            var extractedServices = assembly.GetExportedTypes().Where(x => !x.IsClass).ToList();
            extractedServices.AddRange(authAssembly.GetExportedTypes().Where(x => !x.IsClass));

            foreach (var service in extractedServices)
            {
                var serviceImplementation = assembly.GetExportedTypes()
                    .FirstOrDefault(x => x.IsClass && x.Name == service.Name.Remove(0, 1));

                var authImplementation = authAssembly.GetExportedTypes()
                    .FirstOrDefault(x => x.IsClass && x.Name == service.Name.Remove(0, 1));

                if (authImplementation is not null)
                    services.Add(new ServiceDescriptor(service, authImplementation, ServiceLifetime.Transient));

                if (serviceImplementation == null)
                    continue;

                if (_scopedServices.Contains(service.Name))
                {
                    services.AddScoped(service, serviceImplementation);
                    continue;
                }

                if (_singletonServices.Contains(service.Name))
                {
                    services.AddSingleton(service, serviceImplementation);
                    continue;
                }

                services.Add(new ServiceDescriptor(service, serviceImplementation, ServiceLifetime.Transient));
            }
        }
    }
}
