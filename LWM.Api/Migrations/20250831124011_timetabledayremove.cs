using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class timetabledayremove : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeTableEntries_TimeTableDays_TimeTableDayId",
                table: "TimeTableEntries");

            migrationBuilder.DropTable(
                name: "TimeTableDays");

            migrationBuilder.DropIndex(
                name: "IX_TimeTableEntries_TimeTableDayId",
                table: "TimeTableEntries");

            migrationBuilder.RenameColumn(
                name: "TimeTableDayId",
                table: "TimeTableEntries",
                newName: "DayNumber");

            migrationBuilder.AddColumn<int>(
                name: "TimeTableId",
                table: "TimeTableEntries",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntries_TimeTableId",
                table: "TimeTableEntries",
                column: "TimeTableId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTableEntries_TimeTables_TimeTableId",
                table: "TimeTableEntries",
                column: "TimeTableId",
                principalTable: "TimeTables",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeTableEntries_TimeTables_TimeTableId",
                table: "TimeTableEntries");

            migrationBuilder.DropIndex(
                name: "IX_TimeTableEntries_TimeTableId",
                table: "TimeTableEntries");

            migrationBuilder.DropColumn(
                name: "TimeTableId",
                table: "TimeTableEntries");

            migrationBuilder.RenameColumn(
                name: "DayNumber",
                table: "TimeTableEntries",
                newName: "TimeTableDayId");

            migrationBuilder.CreateTable(
                name: "TimeTableDays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TimeTableId = table.Column<int>(type: "integer", nullable: false),
                    DayOfWeek = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTableDays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeTableDays_TimeTables_TimeTableId",
                        column: x => x.TimeTableId,
                        principalTable: "TimeTables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntries_TimeTableDayId",
                table: "TimeTableEntries",
                column: "TimeTableDayId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableDays_TimeTableId",
                table: "TimeTableDays",
                column: "TimeTableId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTableEntries_TimeTableDays_TimeTableDayId",
                table: "TimeTableEntries",
                column: "TimeTableDayId",
                principalTable: "TimeTableDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
