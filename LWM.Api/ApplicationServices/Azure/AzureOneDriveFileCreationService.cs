using Azure.Core.Extensions;
using LWM.Api.ApplicationServices.Azure.Contracts;
using LWM.Api.Dtos.Azure;
using LWM.Api.Framework.Exceptions;
using LWM.Api.Framework.Services;
using Microsoft.Graph;
using Microsoft.Graph.Drives.Item.Items.Item.CreateUploadSession;
using Microsoft.Graph.Models;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureOneDriveFileCreationService(
        IAzureGraphServiceClientFactory azureGraphServiceClientFactory,
        IApplicationInstanceService applicationInstanceService) : IAzureOneDriveFileCreationService
    {
        public async Task<(string id, string path)> UploadFile(AzureFileEntity azureFileEntity)
        {
            var result = await UploadDocument(azureFileEntity);

            return (result.Id, result.WebUrl);

        }
        private async Task<DriveItem> UploadDocument(AzureFileEntity azureFileEntity)
        {
            using var memstream = new MemoryStream();
            await azureFileEntity.File.CopyToAsync(memstream);

            DriveItem uploadedFile = null;

            var graphClient = await azureGraphServiceClientFactory.CreateGraphClient();

            var drive = await graphClient.Me.Drive.GetAsync();
            var builtFilePath = $"Lessons/All lessons/{azureFileEntity.Lesson.Name}/{azureFileEntity.FileName}.{azureFileEntity.FileName}";

            var uploadSession = await graphClient.Drives[drive.Id].Items["root"].ItemWithPath(builtFilePath)
                .CreateUploadSession.PostAsync(new CreateUploadSessionPostRequestBody()) ?? throw new BadRequestException("Docuemnt upload session failed");

            // Chunk size must be divisible by 320KiB, our chunk size will be slightly more than 1MB
            int maxSizeChunk = (320 * 1024) * 4;
            var fileUploadTask = new LargeFileUploadTask<DriveItem>(uploadSession, memstream, maxSizeChunk);

            // Create a callback that is invoked after each slice is uploaded
            IProgress<long> progress = new Progress<long>(prog =>
            {
            });

            // Upload the file
            var uploadResult = await fileUploadTask.UploadAsync(progress);

            if (!uploadResult.UploadSucceeded)
            {
                //TODO: create new exception type for this error
                throw new BadRequestException("Document upload failed.");
            }

            uploadedFile = uploadResult.ItemResponse;


            return uploadedFile;
        }
    }
}
