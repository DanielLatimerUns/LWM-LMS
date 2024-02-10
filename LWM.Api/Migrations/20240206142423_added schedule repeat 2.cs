using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class addedschedulerepeat2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Repeat",
                table: "LessonSchedule",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartWeek",
                table: "LessonSchedule",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Repeat",
                table: "LessonSchedule");

            migrationBuilder.DropColumn(
                name: "StartWeek",
                table: "LessonSchedule");
        }
    }
}
