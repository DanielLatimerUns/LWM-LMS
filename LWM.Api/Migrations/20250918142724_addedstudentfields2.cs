using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class addedstudentfields2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Teachers_PersonId",
                table: "Teachers");

            migrationBuilder.DropIndex(
                name: "IX_Students_PersonId",
                table: "Students");

            migrationBuilder.AddColumn<int>(
                name: "PersonId1",
                table: "Teachers",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PersonId1",
                table: "Students",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teachers_PersonId",
                table: "Teachers",
                column: "PersonId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teachers_PersonId1",
                table: "Teachers",
                column: "PersonId1");

            migrationBuilder.CreateIndex(
                name: "IX_Students_PersonId",
                table: "Students",
                column: "PersonId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_PersonId1",
                table: "Students",
                column: "PersonId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Persons_PersonId1",
                table: "Students",
                column: "PersonId1",
                principalTable: "Persons",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Persons_PersonId1",
                table: "Teachers",
                column: "PersonId1",
                principalTable: "Persons",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Persons_PersonId1",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Persons_PersonId1",
                table: "Teachers");

            migrationBuilder.DropIndex(
                name: "IX_Teachers_PersonId",
                table: "Teachers");

            migrationBuilder.DropIndex(
                name: "IX_Teachers_PersonId1",
                table: "Teachers");

            migrationBuilder.DropIndex(
                name: "IX_Students_PersonId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_PersonId1",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "PersonId1",
                table: "Teachers");

            migrationBuilder.DropColumn(
                name: "PersonId1",
                table: "Students");

            migrationBuilder.CreateIndex(
                name: "IX_Teachers_PersonId",
                table: "Teachers",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_PersonId",
                table: "Students",
                column: "PersonId");
        }
    }
}
