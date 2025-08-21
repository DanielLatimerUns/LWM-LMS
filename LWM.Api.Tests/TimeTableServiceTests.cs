using FluentAssertions;
using LWM.Api.DomainServices.LessonSchedualService.Contracts;
using LWM.Api.DomainServices.TimeTableService;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace LWM.Api.Tests
{
    public class TimeTableServiceTests
    {
        private readonly Mock<CoreContext> _mockContext;
        private readonly Mock<IScheduleWriteService> _mockScheduleWriteService;
        private readonly TimeTableService _sut;

        public TimeTableServiceTests()
        {
            _mockContext = new Mock<CoreContext>();

            // Setup mock for IScheduleWriteService
            _mockScheduleWriteService = new Mock<IScheduleWriteService>();

            _sut = new TimeTableService(_mockContext.Object, _mockScheduleWriteService.Object);
        }

        [Fact]
        public async Task Publish_WhenAnotherTimeTableIsAlreadyPublished_ThrowsBadRequestException()
        {
            // Arrange
            var publishedTimeTable = new TimeTable { Id = 1, IsPublished = true };
            var timeTableToPublish = new TimeTable { Id = 2, IsPublished = false };

            var timeTables = new List<TimeTable> { publishedTimeTable, timeTableToPublish };

            _mockContext.Setup(x => x.TimeTables.Any(It.IsAny<Func<TimeTable, bool>>()))
                .Returns(true);

            // Act
            Func<Task> act = async () => await _sut.Publish(2);

            // Assert
            await act.Should().ThrowAsync<BadRequestException>()
                .WithMessage("Only one timetable can be published at a time.");
        }

        [Fact]
        public async Task Publish_WhenTimeTableNotFound_ThrowsBadRequestException()
        {
            // Arrange
            int nonExistentTimeTableId = 999;

            _mockContext.Setup(x => x.TimeTables.Any(It.IsAny<Func<TimeTable, bool>>()))
                .Returns(false);

            _mockContext.Setup(m => m.TimeTables)
                .ReturnsDbSet(new List<TimeTable>());

            // Act
            Func<Task> act = async () => await _sut.Publish(nonExistentTimeTableId);

            // Assert
            await act.Should().ThrowAsync<BadRequestException>()
                .WithMessage("Timetable not found");
        }

        [Fact]
        public async Task Publish_WhenTimeTableExists_ReturnsPublishResponses()
        {
            // Arrange
            int timeTableId = 1;

            var timeTableDays = new List<TimeTableDay>
            {
                new TimeTableDay
                {
                    Id = 1,
                    DayOfWeek = DayOfWeek.Monday,
                    TimeTableEntries = new List<TimeTableEntry>
                    {
                        new TimeTableEntry { Id = 1, StartTime = TimeSpan.FromHours(9), EndTime = TimeSpan.FromHours(10) }
                    }
                }
            };

            var timeTable = new TimeTable 
            { 
                Id = timeTableId, 
                IsPublished = false,
                Days = timeTableDays
            };

            _mockContext.Setup(x => x.TimeTables.Any(It.IsAny<Func<TimeTable, bool>>()))
                .Returns(false);

            _mockContext.Setup(m => m.TimeTables)
                .ReturnsDbSet(new List<TimeTable> { timeTable });

            // Mock Include and ThenInclude for Entity Framework
            _mockContext.Setup(x => x.TimeTables.Include(It.IsAny<Func<TimeTable, object>>()))
                .Returns(_mockContext.Object.TimeTables);

            // Act
            var result = await _sut.Publish(timeTableId);

            // Assert
            result.Should().NotBeNull();
            // Add more specific assertions based on expected output from the Publish method
        }

        [Fact]
        public async Task DeleteEntry_CallsDeleteAsyncOnScheduleWriteService()
        {
            // Arrange
            int entryId = 1;

            _mockScheduleWriteService.Setup(x => x.DeleteAsync(entryId))
                .Returns(Task.CompletedTask)
                .Verifiable();

            // Act
            await _sut.DeleteEntry(entryId);

            // Assert
            _mockScheduleWriteService.Verify(x => x.DeleteAsync(entryId), Times.Once);
        }
    }
}
