using FluentAssertions;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Linq.Expressions;
using LWM.Api.ApplicationServices.TimeTable;
using LWM.Api.DomainServices.Schedule.Contracts;
using LWM.Data.Models.Group;
using LWM.Data.Models.TimeTable;
using Xunit;

namespace LWM.Api.Tests
{
    public class TimeTablePublishTest
    {
        private readonly Mock<CoreContext> _mockContext;
        private readonly Mock<IScheduleWriteService> _mockScheduleWriteService;
        private readonly TimeTableService _sut;

        public TimeTablePublishTest()
        {
            _mockContext = new Mock<CoreContext>();
            _mockScheduleWriteService = new Mock<IScheduleWriteService>();
            _sut = new TimeTableService(_mockContext.Object, _mockScheduleWriteService.Object);
        }

        [Fact]
        public async Task Publish_WhenAnotherTimeTableIsAlreadyPublished_ThrowsBadRequestException()
        {
            // Arrange
            int timeTableId = 2;

            _mockContext.Setup(x => x.TimeTables.Any(It.IsAny<Expression<Func<TimeTable, bool>>>()))
                .Returns(true);

            // Act
            Func<Task> act = async () => await _sut.Publish(timeTableId);

            // Assert
            await act.Should().ThrowAsync<BadRequestException>()
                .WithMessage("Only one timetable can be published at a time.");
        }

        [Fact]
        public async Task Publish_WhenTimeTableNotFound_ThrowsBadRequestException()
        {
            // Arrange
            int nonExistentTimeTableId = 999;

            _mockContext.Setup(x => x.TimeTables.Any(It.IsAny<Expression<Func<TimeTable, bool>>>()))
                .Returns(false);

            // Create a mock DbSet for TimeTables
            var mockTimeTableDbSet = new Mock<DbSet<TimeTable>>();

            // Setup the Include method chain
            mockTimeTableDbSet.Setup(m => m.Include(It.IsAny<string>()))
                .Returns(mockTimeTableDbSet.Object);

            _mockContext.Setup(m => m.TimeTables)
                .Returns(mockTimeTableDbSet.Object);

            // Make FirstOrDefaultAsync return null
            mockTimeTableDbSet.Setup(m => m.FirstOrDefaultAsync(
                It.IsAny<Expression<Func<TimeTable, bool>>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync((TimeTable)null);

            // Act
            Func<Task> act = async () => await _sut.Publish(nonExistentTimeTableId);

            // Assert
            await act.Should().ThrowAsync<BadRequestException>()
                .WithMessage("Timetable not found");
        }

        [Fact]
        public async Task Publish_WhenTimeTableExists_PublishesTimeTableAndReturnsResponses()
        {
            // Arrange
            int timeTableId = 1;

            // Create a test timetable with days and entries
            var timeTableEntries = new List<TimeTableEntry>
            {
                new TimeTableEntry
                {
                    Id = 1,
                    StartTime = new TimeSpan(9, 0, 0),
                    EndTime = new TimeSpan(10, 0, 0),
                    Group = new Group { Id = 1, Name = "Group 1" },
                }
            };

            var timeTableDays = new List<TimeTableDay>
            {
                new TimeTableDay
                {
                    Id = 1,
                    DayOfWeek = DayOfWeek.Monday,
                    TimeTableEntries = timeTableEntries
                }
            };

            var timeTable = new TimeTable
            {
                Id = timeTableId,
                Name = "Test Timetable",
                IsPublished = false,
                Days = timeTableDays
            };

            // Setup mock to return false for "any other timetable is published"
            _mockContext.Setup(x => x.TimeTables.Any(It.IsAny<Expression<Func<TimeTable, bool>>>()))
                .Returns(false);

            // Setup mock for the database context to return our test timetable
            var mockDbSet = new Mock<DbSet<TimeTable>>();
            _mockContext.Setup(c => c.TimeTables).Returns(mockDbSet.Object);

            // Mock the Include and ThenInclude chain
            mockDbSet.Setup(m => m.Include(It.IsAny<string>()))
                .Returns(mockDbSet.Object);

            // Setup FirstOrDefaultAsync to return our test timetable
            mockDbSet.Setup(m => m.FirstOrDefaultAsync(
                It.IsAny<Expression<Func<TimeTable, bool>>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(timeTable);

            // Act
            var result = await _sut.Publish(timeTableId);

            // Assert
            // Check that the result is not null and contains expected response items
            result.Should().NotBeNull();

            // Verify that SaveChangesAsync was called (to save the published state)
            _mockContext.Verify(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);

            // Verify that the timetable was marked as published
            timeTable.IsPublished.Should().BeTrue();
        }
    }
}
