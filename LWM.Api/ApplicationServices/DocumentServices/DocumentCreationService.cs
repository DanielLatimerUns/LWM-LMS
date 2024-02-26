using LWM.Api.DomainServices.DocumentService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Models;

namespace LWM.Api.ApplicationServices.DocumentServices
{
    public class DocumentCreationService(IDocumentWriteService documentWriteService)
    {
        public async Task<int> Execute(LessonDocument document)
        {
            if (document == null)
            {
                throw new BadRequestException("No documenr provided");
            }

            if (document.DocumentStorageProvidor == Enums.DocumentStorageProvidor.Azure)
            {

            }

            return 1;
        }
    }
}
