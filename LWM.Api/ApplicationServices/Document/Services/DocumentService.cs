using LWM.Api.ApplicationServices.Azure;
using LWM.Api.ApplicationServices.Azure.Services;
using LWM.Api.DomainServices.Document.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Dtos.Models.Azure;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.ApplicationServices.Document.Services
{
    public interface IDocumentService
    {
        Task<int> Create(LessonDocumentModel document);
    }

    public class DocumentService(
        IDocumentWriteService documentWriteService,
        IAzureOneDriveFileCreationService azureOneDriveFileCreationService,
        CoreContext coreContext) : IDocumentService
    {
        public async Task<int> Create(LessonDocumentModel document)
        {
            if (document == null)
            {
                throw new BadRequestException("No document provided");
            }

            if (document.DocumentStorageProvidor == Enums.DocumentStorageProvidor.Azure)
            {
                var lesson = coreContext.Lessons.FirstOrDefault(x => x.Id == document.LessonId) ??
                    throw new NotFoundException("Lesson not found");

                var azureEntity = await azureOneDriveFileCreationService.UploadFileAsync(new AzureFileEntityModel
                {
                    File = document.FormFile,
                    FileName = document.Name,
                    Lesson = new Dtos.Models.LessonModel
                    {
                        Id = document.LessonId,
                        Name = document.Name,
                    }
                });

                var documentModel = new LessonDocumentModel
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
