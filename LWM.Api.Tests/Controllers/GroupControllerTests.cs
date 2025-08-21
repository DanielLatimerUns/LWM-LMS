using FluentAssertions;
using LWM.Api.Controllers;
using LWM.Api.Dtos.Models;
using Moq;
using LWM.Api.ApplicationServices.Group.Queries;
using LWM.Api.ApplicationServices.Student.Queries;
using LWM.Api.DomainServices.Group.Contracts;
using Xunit;

namespace LWM.Api.Tests.Controllers
{
    public class GroupControllerTests
    {
        private readonly Mock<IStudentQueries> _mockStudentQueries;
        private readonly Mock<IGroupWriteService> _mockGroupWriteService;
        private readonly Mock<IGroupQueries> _mockGroupQueries;
        private readonly GroupController _controller;

        public GroupControllerTests()
        {
            _mockStudentQueries = new Mock<IStudentQueries>();
            _mockGroupWriteService = new Mock<IGroupWriteService>();
            _mockGroupQueries = new Mock<IGroupQueries>();
            _controller = new GroupController(
                _mockStudentQueries.Object,
                _mockGroupWriteService.Object,
                _mockGroupQueries.Object);
        }

        [Fact]
        public async Task Get_ReturnsAllGroups()
        {
            // Arrange
            var groups = new List<GroupModel>
            {
                new GroupModel { Id = 1, Name = "Group 1" },
                new GroupModel { Id = 2, Name = "Group 2" }
            };

            _mockGroupQueries.Setup(x => x.GetGroupsAsync())
                .ReturnsAsync(groups);

            // Act
            var result = await _controller.Get();

            // Assert
            result.Should().BeEquivalentTo(groups);
            _mockGroupQueries.Verify(x => x.GetGroupsAsync(), Times.Once);
        }

        [Fact]
        public async Task GetWithFilter_ReturnsFilteredGroups()
        {
            // Arrange
            var searchString = "Group 1";
            var filteredGroups = new List<GroupModel>
            {
                new GroupModel { Id = 1, Name = "Group 1" }
            };

            _mockGroupQueries.Setup(x => x.GetGroupsBySearchStringAsync(searchString))
                .ReturnsAsync(filteredGroups);

            // Act
            var result = await _controller.GetWithFilter(searchString);

            // Assert
            result.Should().BeEquivalentTo(filteredGroups);
            _mockGroupQueries.Verify(x => x.GetGroupsBySearchStringAsync(searchString), Times.Once);
        }

        [Fact]
        public async Task GetByGroupId_ReturnsStudentsInGroup()
        {
            // Arrange
            var groupId = 1;
            var students = new List<StudentModel>
            {
                new StudentModel { Id = 1, Name = "Student 1", GroupId = groupId },
                new StudentModel { Id = 2, Name = "Student 2", GroupId = groupId }
            };

            _mockStudentQueries.Setup(x => x.GetStudentsByGroupIdAsync(groupId))
                .ReturnsAsync(students);

            // Act
            var result = await _controller.GetByGroupId(groupId);

            // Assert
            result.Should().BeEquivalentTo(students);
            _mockStudentQueries.Verify(x => x.GetStudentsByGroupIdAsync(groupId), Times.Once);
        }

        [Fact]
        public async Task Create_ReturnsCreatedGroupId()
        {
            // Arrange
            var group = new GroupModel { Name = "New Group", TeacherId = 1 };
            var createdId = 1;

            _mockGroupWriteService.Setup(x => x.CreateAsync(group))
                .ReturnsAsync(createdId);

            // Act
            var result = await _controller.Create(group);

            // Assert
            result.Should().Be(createdId);
            _mockGroupWriteService.Verify(x => x.CreateAsync(group), Times.Once);
        }

        [Fact]
        public async Task Update_CallsUpdateAsyncOnService()
        {
            // Arrange
            var group = new GroupModel { Id = 1, Name = "Updated Group", TeacherId = 1 };

            _mockGroupWriteService.Setup(x => x.UpdateAsync(group))
                .Returns(Task.CompletedTask)
                .Verifiable();

            // Act
            await _controller.Update(group);

            // Assert
            _mockGroupWriteService.Verify(x => x.UpdateAsync(group), Times.Once);
        }

        [Fact]
        public async Task Delete_CallsDeleteAsyncOnService()
        {
            // Arrange
            var groupId = 1;

            _mockGroupWriteService.Setup(x => x.DeleteAsync(groupId))
                .Returns(Task.CompletedTask)
                .Verifiable();

            // Act
            await _controller.Delete(groupId);

            // Assert
            _mockGroupWriteService.Verify(x => x.DeleteAsync(groupId), Times.Once);
        }
    }
}
