using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class addAzureUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonCurriculums_AzureObjectLinks_AzureObjectLinkId",
                table: "LessonCurriculums");

            migrationBuilder.AlterColumn<int>(
                name: "AzureObjectLinkId",
                table: "LessonCurriculums",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "AzureUserEmail",
                table: "Configurations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonCurriculums_AzureObjectLinks_AzureObjectLinkId",
                table: "LessonCurriculums",
                column: "AzureObjectLinkId",
                principalTable: "AzureObjectLinks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonCurriculums_AzureObjectLinks_AzureObjectLinkId",
                table: "LessonCurriculums");

            migrationBuilder.DropColumn(
                name: "AzureUserEmail",
                table: "Configurations");

            migrationBuilder.AlterColumn<int>(
                name: "AzureObjectLinkId",
                table: "LessonCurriculums",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonCurriculums_AzureObjectLinks_AzureObjectLinkId",
                table: "LessonCurriculums",
                column: "AzureObjectLinkId",
                principalTable: "AzureObjectLinks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
