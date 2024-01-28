using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class addlessonscheduleendtime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SchedualedTime",
                table: "LessonSchedule",
                newName: "SchedualedStartTime");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "SchedualedEndTime",
                table: "LessonSchedule",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SchedualedEndTime",
                table: "LessonSchedule");

            migrationBuilder.RenameColumn(
                name: "SchedualedStartTime",
                table: "LessonSchedule",
                newName: "SchedualedTime");
        }
    }
}
