using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class updatedgrouptable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Persons_PersonId",
                table: "Teachers");

            migrationBuilder.AlterColumn<int>(
                name: "PersonId",
                table: "Teachers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Persons_PersonId",
                table: "Teachers",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Persons_PersonId",
                table: "Teachers");

            migrationBuilder.AlterColumn<int>(
                name: "PersonId",
                table: "Teachers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Persons_PersonId",
                table: "Teachers",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
