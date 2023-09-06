using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AttendanceApp.Data.Migrations
{
    public partial class changedattrecordstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassName",
                table: "CourseInfos");

            migrationBuilder.DropColumn(
                name: "ClassId",
                table: "AttendanceRecords");

            migrationBuilder.RenameColumn(
                name: "Period",
                table: "AttendanceRecords",
                newName: "CourseId");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "StartTime",
                table: "AttendanceRecords",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "AttendanceRecords");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "AttendanceRecords",
                newName: "Period");

            migrationBuilder.AddColumn<string>(
                name: "ClassName",
                table: "CourseInfos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClassId",
                table: "AttendanceRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
