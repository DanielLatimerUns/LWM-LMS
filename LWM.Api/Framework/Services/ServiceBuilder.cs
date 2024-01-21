using System.Reflection;
using LWM.Api.DomainServices.DocumentService;

namespace LWM.Api.Framework.Services
{
    public class ServiceBuilder
    {
        public static void BuildServices(IServiceCollection services)
        {
            var assembly = Assembly.GetAssembly(typeof(DocumentReadService));

            var extractedServices = assembly.GetExportedTypes().Where(x => x.Name.Contains("Service") && !x.IsClass);

            foreach (var service in extractedServices)
            {
                var serviceImplementation = assembly.GetExportedTypes()
                    .FirstOrDefault(x => x.IsClass && x.Name == service.Name.Remove(0, 1));

                if (serviceImplementation == null)
                    continue;

                services.Add(new ServiceDescriptor(service, serviceImplementation, ServiceLifetime.Transient));
            }
        }
    }
}
