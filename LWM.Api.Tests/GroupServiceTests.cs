using FluentAssertions;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LWM.Api.DomainServices.Group;
using LWM.Data.Models.Group;
using LWM.Data.Models.Person;
using Xunit;

namespace LWM.Api.Tests
{
    public class GroupServiceTests
    {
        private readonly Mock<CoreContext> _mockContext;
        private readonly GroupWriteService _sut;

        public GroupServiceTests()
        {
            _mockContext = new Mock<CoreContext>();
            _sut = new GroupWriteService(_mockContext.Object);
        }

        [Fact]
        public async Task CreateAsync_CreatesNewGroup_ReturnsId()
        {
            // Arrange
            var groupModel = new GroupModel
            {
                Name = "Test Group",
                TeacherId = 1
            };

            var teacher = new Teacher { Id = 1};
            var groups = new List<Group>();

            _mockContext.Setup(x => x.Teachers.First(t => t.Id == groupModel.TeacherId))
                .Returns(teacher);

            _mockContext.Setup(x => x.Groups)
                .ReturnsDbSet(groups);

            _mockContext.Setup(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(1);

            // Act
            var result = await _sut.CreateAsync(groupModel);

            // Assert
            result.Should().BeGreaterThan(0);
            groups.Should().ContainSingle();
            groups.First().Name.Should().Be("Test Group");
            groups.First().Teacher.Should().Be(teacher);
            _mockContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task UpdateAsync_WhenGroupExists_UpdatesGroup()
        {
            // Arrange
            var groupId = 1;
            var groupModel = new GroupModel
            {
                Id = groupId,
                Name = "Updated Group Name",
                TeacherId = 2,
                ComepletedLessonNo = 5
            };

            var existingGroup = new Group
            {
                Id = groupId,
                Name = "Original Group Name",
                CompletedLessonNo = 3,
                Teacher = new Teacher { Id = 1 }
            };

            var newTeacher = new Teacher { Id = 2 };

            _mockContext.Setup(x => x.Groups.FirstOrDefault(g => g.Id == groupId))
                .Returns(existingGroup);

            _mockContext.Setup(x => x.Teachers.First(t => t.Id == groupModel.TeacherId))
                .Returns(newTeacher);

            // Act
            await _sut.UpdateAsync(groupModel);

            // Assert
            existingGroup.Name.Should().Be("Updated Group Name");
            existingGroup.CompletedLessonNo.Should().Be(5);
            existingGroup.Teacher.Should().Be(newTeacher);
            _mockContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task UpdateAsync_WhenGroupDoesNotExist_ThrowsNotFoundException()
        {
            // Arrange
            var groupId = 999;
            var groupModel = new GroupModel { Id = groupId, Name = "Non-existent Group" };

            _mockContext.Setup(x => x.Groups.FirstOrDefault(g => g.Id == groupId))
                .Returns((Group)null);

            // Act
            Func<Task> act = async () => await _sut.UpdateAsync(groupModel);

            // Assert
            await act.Should().ThrowAsync<NotFoundException>()
                .WithMessage("No Group Found.");
            _mockContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
        }

        [Fact]
        public async Task DeleteAsync_WhenGroupExists_RemovesGroup()
        {
            // Arrange
            var groupId = 1;
            var existingGroup = new Group { Id = groupId, Name = "Group to Delete" };

            _mockContext.Setup(x => x.Groups.FirstOrDefault(g => g.Id == groupId))
                .Returns(existingGroup);

            // Act
            await _sut.DeleteAsync(groupId);

            // Assert
            _mockContext.Verify(x => x.Groups.Remove(existingGroup), Times.Once);
            _mockContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task DeleteAsync_WhenGroupDoesNotExist_ThrowsNotFoundException()
        {
            // Arrange
            var groupId = 999;

            _mockContext.Setup(x => x.Groups.FirstOrDefault(g => g.Id == groupId))
                .Returns((Group)null);

            // Act
            Func<Task> act = async () => await _sut.DeleteAsync(groupId);

            // Assert
            await act.Should().ThrowAsync<NotFoundException>()
                .WithMessage("No Group Found.");
            _mockContext.Verify(x => x.Groups.Remove(It.IsAny<Group>()), Times.Never);
            _mockContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
        }
    }
}
