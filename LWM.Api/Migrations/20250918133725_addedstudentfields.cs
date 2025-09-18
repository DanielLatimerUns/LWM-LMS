using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class addedstudentfields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "Students",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SessionPaymentAmount",
                table: "Students",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Persons",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "SessionPaymentAmount",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Persons");
        }
    }
}
