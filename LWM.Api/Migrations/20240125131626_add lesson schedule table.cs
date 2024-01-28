using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class addlessonscheduletable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instances_Schedules_LessonScheduleId",
                table: "Instances");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Groups_GroupId",
                table: "Schedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Schedules",
                table: "Schedules");

            migrationBuilder.RenameTable(
                name: "Schedules",
                newName: "LessonSchedule");

            migrationBuilder.RenameIndex(
                name: "IX_Schedules_GroupId",
                table: "LessonSchedule",
                newName: "IX_LessonSchedule_GroupId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonSchedule",
                table: "LessonSchedule",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Instances_LessonSchedule_LessonScheduleId",
                table: "Instances",
                column: "LessonScheduleId",
                principalTable: "LessonSchedule",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonSchedule_Groups_GroupId",
                table: "LessonSchedule",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instances_LessonSchedule_LessonScheduleId",
                table: "Instances");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonSchedule_Groups_GroupId",
                table: "LessonSchedule");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonSchedule",
                table: "LessonSchedule");

            migrationBuilder.RenameTable(
                name: "LessonSchedule",
                newName: "Schedules");

            migrationBuilder.RenameIndex(
                name: "IX_LessonSchedule_GroupId",
                table: "Schedules",
                newName: "IX_Schedules_GroupId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Schedules",
                table: "Schedules",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Instances_Schedules_LessonScheduleId",
                table: "Instances",
                column: "LessonScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Groups_GroupId",
                table: "Schedules",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
