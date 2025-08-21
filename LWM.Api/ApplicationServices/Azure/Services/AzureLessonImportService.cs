using LWM.Api.DomainServices.Curriculum.Contracts;
using LWM.Api.DomainServices.Document.Contracts;
using LWM.Api.DomainServices.Lesson.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Dtos.Models.Azure;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph.Models;
using Curriculum = LWM.Data.Models.Curriculum.Curriculum;

namespace LWM.Api.ApplicationServices.Azure.Services
{
    public interface IAzureLessonImportService
    {
        Task ImportAsync();
    }

    public class AzureLessonImportService(
        IAzureGraphServiceClientFactory azureGraphServiceClientFactory,
        CoreContext coreContext,
        ICurriculumWriteService curriculumWriteService,
        ILessonWriteService lessonWriteService,
        IDocumentWriteService documentWriteService) : IAzureLessonImportService
    {
        public async Task ImportAsync()
        {
            var azureEntities = await GenerateAzureLessonImportEntities();

            foreach (var entity in azureEntities.First().Children)
            {
                if (entity.EntityType == AzureLessonImportEntityType.Curriculum)
                {
                    var curriculumModel = coreContext.LessonCurriculums.Include(x => x.AzureObjectLink).FirstOrDefault(
                        x => x.AzureObjectLink.AzureId == entity.AzureID.ToString());

                    if (curriculumModel is null)
                    {
                        var azureLink = new AzureObjectLink { AzureId = entity.AzureID.ToString() };
                        coreContext.AzureObjectLinks.Add(azureLink);
                        coreContext.SaveChanges();

                        var curriculumId = await curriculumWriteService.CreateAsync(
                            new Dtos.Models.CurriculumModel
                            {
                                Name = entity.Name,
                                Targetlanguage = "Greek",
                                NativeLanguage = entity.Name
                            }, azureLink);

                        curriculumModel = coreContext.LessonCurriculums.First(x => x.Id == curriculumId);
                    }

                    await ImportLessonsForCurriculum(curriculumModel, entity);
                }
            }
        }

        private async Task ImportLessonsForCurriculum(Curriculum curriculum, AzureLessonImportEntity azureLessonImportEntity)
        {
            int lessonNo = 1;

            foreach (var entity in azureLessonImportEntity.Children)
            {
                if (entity.EntityType == AzureLessonImportEntityType.Lesson)
                {
                    var lesson = coreContext.Lessons.Include(x => x.AzureObjectLink).FirstOrDefault(
                        x => x.AzureObjectLink.AzureId == entity.AzureID.ToString());

                    if (lesson is null)
                    {
                        var azureLink = new AzureObjectLink { AzureId = entity.AzureID.ToString() };
                        coreContext.AzureObjectLinks.Add(azureLink);
                        coreContext.SaveChanges();

                        var lessonId = await lessonWriteService.CreateAsync(new Dtos.Models.LessonModel
                        {
                            Name = entity.Name,
                            LessonNo = lessonNo,
                            CurriculumId = curriculum.Id
                        }, azureLink);

                        lesson = coreContext.Lessons.FirstOrDefault(x => x.Id == lessonId);
                    }

                    await ImportDocumentsForLesson(lesson, entity);
                }
                lessonNo++;
            }
        }

        private async Task ImportDocumentsForLesson(Data.Models.Lesson.Lesson lesson, AzureLessonImportEntity azureLessonImportEntity)
        {
            foreach (var entity in azureLessonImportEntity.Children)
            {
                if (entity.EntityType == AzureLessonImportEntityType.Document)
                {
                    var document = coreContext.Documents.Include(x => x.AzureObjectLink).FirstOrDefault(
                        x => x.AzureObjectLink.AzureId == entity.AzureID.ToString());

                    if (document is null)
                    {
                        var azureLink = new AzureObjectLink { AzureId = entity.AzureID.ToString() };
                        coreContext.AzureObjectLinks.Add(azureLink);
                        coreContext.SaveChanges();

                        await documentWriteService.CreateAsync(new LessonDocumentModel
                        {
                            Name = entity.Name,
                            Path = entity.FilePath,
                            LessonId = lesson.Id
                        }, azureLink);
                    }
                }
            }
        }

        private async Task<List<AzureLessonImportEntity>> GenerateAzureLessonImportEntities()
        {
            var graphClient = await azureGraphServiceClientFactory.CreateGraphClientAsync();

            var drive = await graphClient.Me.Drive.GetAsync() ??
                throw new NotFoundException("Users Drive not found.");

            var rootItems = await graphClient.Drives[drive.Id].Items["root"].Children.GetAsync() ??
                throw new NotFoundException("Root folder not found.");

            var lessonRoot = rootItems.Value?.FirstOrDefault(x => x.Name?.ToUpper() == "LESSONS") ??
                throw new NotFoundException("Lessons folder not found.");

            var lessonRootItems = await graphClient.Drives[drive.Id].Items[lessonRoot.Id].Children.GetAsync() ??
                throw new NotFoundException("Lessons folder items not found.");

            var allLessonRoot = lessonRootItems?.Value?.FirstOrDefault(x => x.Name?.ToUpper() == "ALL LESSONS") ??
                throw new NotFoundException("All Lessons folder not found.");

            var allLessonsItems = await graphClient.Drives[drive.Id].Items[allLessonRoot.Id].Children.GetAsync() ??
                throw new NotFoundException("All Lessons folder items not found.");

            var files = new List<AzureLessonImportEntity>();

            // Import Greek Lessons
            foreach (var item in allLessonsItems.Value?.Where(x => x.Name == "Greek"))
            {
                var file = new AzureLessonImportEntity { Name = item.Name ?? "", AzureID = item.Id };
                await AddChildItems(drive.Id ?? "", item, file, 1);
                files.Add(file);
            }

            return files;
        }

        private async Task AddChildItems(string rootDriveId, DriveItem item, AzureLessonImportEntity file, int level)
        {
            var graphClient = await azureGraphServiceClientFactory.CreateGraphClientAsync();

            if (item.Folder != null)
            {
                var children = await graphClient.Drives[rootDriveId].Items[item.Id].Children.GetAsync();

                if (children?.Value is null)
                    return;

                foreach (var child in children.Value)
                {
                    var childitem =
                        new AzureLessonImportEntity
                        {
                            Name = child.Name ?? "",
                            AzureID = child.Id,
                            EntityType = child.Folder is null ? AzureLessonImportEntityType.Document :
                                level == 1 ? AzureLessonImportEntityType.Curriculum : AzureLessonImportEntityType.Lesson
                        };

                    if (childitem.EntityType == AzureLessonImportEntityType.Document)
                    {
                        childitem.FilePath = child.WebUrl;
                    }

                    file.Children.Add(childitem);
                    await AddChildItems(rootDriveId, child, childitem, level + 1);
                }
            }
        }
    }
}
