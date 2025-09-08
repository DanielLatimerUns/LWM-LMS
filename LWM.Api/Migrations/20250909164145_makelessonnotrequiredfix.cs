using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class makelessonnotrequiredfix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instances_Lessons_LessonId",
                table: "Instances");

            migrationBuilder.AlterColumn<int>(
                name: "LessonId",
                table: "Instances",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Instances_Lessons_LessonId",
                table: "Instances",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instances_Lessons_LessonId",
                table: "Instances");

            migrationBuilder.AlterColumn<int>(
                name: "LessonId",
                table: "Instances",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Instances_Lessons_LessonId",
                table: "Instances",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
