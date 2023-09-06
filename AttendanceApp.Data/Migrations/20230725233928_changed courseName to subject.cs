using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AttendanceApp.Data.Migrations
{
    public partial class changedcourseNametosubject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CourseName",
                table: "Courses",
                newName: "Subject");

            migrationBuilder.AddColumn<int>(
                name: "Grade",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Grade",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "Subject",
                table: "Courses",
                newName: "CourseName");
        }
    }
}
