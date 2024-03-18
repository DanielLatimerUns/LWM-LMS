using LWM.Api.ApplicationServices.Azure.Contracts;
using LWM.Api.ApplicationServices.Document.Contracts;
using LWM.Api.DomainServices.DocumentService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.ApplicationServices.Document.Services
{
    public class DocumentCreationService(
        IDocumentWriteService documentWriteService,
        IAzureOneDriveFileCreationService azureOneDriveFileCreationService,
        CoreContext coreContext) : IDocumentCreationService
    {
        public async Task<int> Execute(LessonDocument document)
        {
            if (document == null)
            {
                throw new BadRequestException("No document provided");
            }

            if (document.DocumentStorageProvidor == Enums.DocumentStorageProvidor.Azure)
            {
                var lesson = coreContext.Lessons.FirstOrDefault(x => x.Id == document.LessonId) ??
                    throw new NotFoundException("Lesson not found");

                var azureEntity = await azureOneDriveFileCreationService.UploadFileAsync(new Dtos.Azure.AzureFileEntity
                {
                    File = document.FormFile,
                    FileName = document.Name,
                    Lesson = new Dtos.DomainEntities.Lesson
                    {
                        Id = document.LessonId,
                        Name = document.Name,
                    }
                });

                var documentModel = new LessonDocument
                {
                    LessonId = lesson.Id,
                    Name = document.Name,
                    DocumentStorageProvidor = document.DocumentStorageProvidor,
                    Path = azureEntity.path,
                };

                await documentWriteService.CreateAsync(documentModel, new AzureObjectLink { AzureId = azureEntity.id });
            }

            return 1;
        }
    }
}
