using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class movetimetableentry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_TimeTableEntries_TimeTableEntryId",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_TimeTableEntryId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "TimeTableEntryId",
                table: "Schedules");

            migrationBuilder.AddColumn<int>(
                name: "TimeTableEntryId",
                table: "Instances",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Instances_TimeTableEntryId",
                table: "Instances",
                column: "TimeTableEntryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Instances_TimeTableEntries_TimeTableEntryId",
                table: "Instances",
                column: "TimeTableEntryId",
                principalTable: "TimeTableEntries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instances_TimeTableEntries_TimeTableEntryId",
                table: "Instances");

            migrationBuilder.DropIndex(
                name: "IX_Instances_TimeTableEntryId",
                table: "Instances");

            migrationBuilder.DropColumn(
                name: "TimeTableEntryId",
                table: "Instances");

            migrationBuilder.AddColumn<int>(
                name: "TimeTableEntryId",
                table: "Schedules",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_TimeTableEntryId",
                table: "Schedules",
                column: "TimeTableEntryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_TimeTableEntries_TimeTableEntryId",
                table: "Schedules",
                column: "TimeTableEntryId",
                principalTable: "TimeTableEntries",
                principalColumn: "Id");
        }
    }
}
