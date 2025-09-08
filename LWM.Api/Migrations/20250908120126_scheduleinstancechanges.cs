using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class scheduleinstancechanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instances_Schedules_ScheduleItemId",
                table: "Instances");

            migrationBuilder.AlterColumn<int>(
                name: "ScheduleItemId",
                table: "Instances",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "WeekNumber",
                table: "Instances",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Instances_Schedules_ScheduleItemId",
                table: "Instances",
                column: "ScheduleItemId",
                principalTable: "Schedules",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instances_Schedules_ScheduleItemId",
                table: "Instances");

            migrationBuilder.DropColumn(
                name: "WeekNumber",
                table: "Instances");

            migrationBuilder.AlterColumn<int>(
                name: "ScheduleItemId",
                table: "Instances",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Instances_Schedules_ScheduleItemId",
                table: "Instances",
                column: "ScheduleItemId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
