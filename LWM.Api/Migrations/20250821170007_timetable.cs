using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LWM.Api.Migrations
{
    /// <inheritdoc />
    public partial class timetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instances_ScheduleItem_ScheduleItemId",
                table: "Instances");

            migrationBuilder.DropTable(
                name: "ScheduleItem");

            migrationBuilder.DropTable(
                name: "TimeTableEntry");

            migrationBuilder.DropTable(
                name: "TimeTableDay");

            migrationBuilder.DropTable(
                name: "TimeTable");

            migrationBuilder.RenameColumn(
                name: "SchedualedDateTime",
                table: "Instances",
                newName: "ScheduledDateTime");

            migrationBuilder.AddColumn<bool>(
                name: "IsCancelled",
                table: "Instances",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "TimeTables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsPublished = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TimeTableDays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DayOfWeek = table.Column<int>(type: "integer", nullable: false),
                    TimeTableId = table.Column<int>(type: "integer", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "TimeTableEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    TimeTableDayId = table.Column<int>(type: "integer", nullable: false),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    TeacherId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTableEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeTableEntries_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimeTableEntries_Teachers_TeacherId",
                        column: x => x.TeacherId,
                        principalTable: "Teachers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimeTableEntries_TimeTableDays_TimeTableDayId",
                        column: x => x.TimeTableDayId,
                        principalTable: "TimeTableDays",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ScheduledDayOfWeek = table.Column<int>(type: "integer", nullable: false),
                    StartWeek = table.Column<int>(type: "integer", nullable: false),
                    Repeat = table.Column<int>(type: "integer", nullable: false),
                    ScheduledStartTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    ScheduledEndTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    TimeTableEntryId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedules_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Schedules_TimeTableEntries_TimeTableEntryId",
                        column: x => x.TimeTableEntryId,
                        principalTable: "TimeTableEntries",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_GroupId",
                table: "Schedules",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_TimeTableEntryId",
                table: "Schedules",
                column: "TimeTableEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableDays_TimeTableId",
                table: "TimeTableDays",
                column: "TimeTableId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntries_GroupId",
                table: "TimeTableEntries",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntries_TeacherId",
                table: "TimeTableEntries",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntries_TimeTableDayId",
                table: "TimeTableEntries",
                column: "TimeTableDayId");

            migrationBuilder.AddForeignKey(
                name: "FK_Instances_Schedules_ScheduleItemId",
                table: "Instances",
                column: "ScheduleItemId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instances_Schedules_ScheduleItemId",
                table: "Instances");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "TimeTableEntries");

            migrationBuilder.DropTable(
                name: "TimeTableDays");

            migrationBuilder.DropTable(
                name: "TimeTables");

            migrationBuilder.DropColumn(
                name: "IsCancelled",
                table: "Instances");

            migrationBuilder.RenameColumn(
                name: "ScheduledDateTime",
                table: "Instances",
                newName: "SchedualedDateTime");

            migrationBuilder.CreateTable(
                name: "TimeTable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTable", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TimeTableDay",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TimeTableId = table.Column<int>(type: "integer", nullable: false),
                    DayOfWeek = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTableDay", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeTableDay_TimeTable_TimeTableId",
                        column: x => x.TimeTableId,
                        principalTable: "TimeTable",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TimeTableEntry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    TimeTableDayId = table.Column<int>(type: "integer", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTableEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeTableEntry_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimeTableEntry_TimeTableDay_TimeTableDayId",
                        column: x => x.TimeTableDayId,
                        principalTable: "TimeTableDay",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ScheduleItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    TimeTableEntryId = table.Column<int>(type: "integer", nullable: true),
                    Repeat = table.Column<int>(type: "integer", nullable: false),
                    SchedualedDayOfWeek = table.Column<int>(type: "integer", nullable: false),
                    SchedualedEndTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    SchedualedStartTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    StartWeek = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScheduleItem_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ScheduleItem_TimeTableEntry_TimeTableEntryId",
                        column: x => x.TimeTableEntryId,
                        principalTable: "TimeTableEntry",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleItem_GroupId",
                table: "ScheduleItem",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleItem_TimeTableEntryId",
                table: "ScheduleItem",
                column: "TimeTableEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableDay_TimeTableId",
                table: "TimeTableDay",
                column: "TimeTableId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntry_GroupId",
                table: "TimeTableEntry",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntry_TimeTableDayId",
                table: "TimeTableEntry",
                column: "TimeTableDayId");

            migrationBuilder.AddForeignKey(
                name: "FK_Instances_ScheduleItem_ScheduleItemId",
                table: "Instances",
                column: "ScheduleItemId",
                principalTable: "ScheduleItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
