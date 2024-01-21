using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class updatepersontablecolumnnames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ForeName",
                table: "Persons",
                newName: "Forename");

            migrationBuilder.RenameColumn(
                name: "SureName",
                table: "Persons",
                newName: "Surname");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Forename",
                table: "Persons",
                newName: "ForeName");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Persons",
                newName: "SureName");
        }
    }
}
