using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class scheduletitledescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Schedules",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Schedules",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Schedules");
        }
    }
}
