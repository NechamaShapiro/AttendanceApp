using AttendanceApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.Globalization;
using System.Security.Cryptography.X509Certificates;

namespace AttendanceApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppController : ControllerBase
    {
        private readonly string _connectionString;

        public AppController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getcourses")]
        public List<Course> GetCourses()
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetCourses();
        }

        [HttpGet]
        [Route("getteachers")]
        public List<Teacher> GetTeachers()
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetTeachers();
        }
        [HttpGet]
        [Route("getclasses")]
        public List<Class> GetClasses()
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetClasses();
        }

        [HttpGet]
        [Route("getallstudents")]
        public List<Student> GetAllStudents()
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetAllStudents();
        }

        [HttpGet]
        [Route("getbygrade")]
        public List<Student> GetByGrade(int grade)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetByGrade(grade);
        }

        [HttpGet]
        [Route("getbyclass")]
        public List<Student> GetByClass(int classId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetByClass(classId);
        }

        [HttpPost]
        [Route("addteacher")]
        public void AddTeacher(string name)
        {
            var repo = new AppRepository(_connectionString);
            repo.AddTeacher(name);
        }
        [HttpPost]
        [Route("addstudent")]
        public void AddStudent(string name, int grade)
        {
            var repo = new AppRepository(_connectionString);
            repo.AddStudent(name, grade);
        }

        [HttpPost]
        [Route("createcourse")]
        public int CreateCourse(string subject, int grade, int classId, int teacherId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.CreateCourse(subject, grade, classId, teacherId);
        }

        [HttpPost]
        [Route("addsession")]
        //public void AddSession(int courseId, string dayOfWeek, TimeSpan startTime, TimeSpan endTime)
        //{
        //    var repo = new AppRepository(_connectionString);
        //    repo.AddSession(courseId, dayOfWeek, startTime, endTime);
        //}
        public void AddSession(int courseId, [FromBody] List<CourseSession> newSessions)
        {
            var repo = new AppRepository(_connectionString);
            foreach (var session in newSessions)
            {
                repo.AddSession(courseId, session.DayOfWeek, session.StartTime, session.EndTime);
            }
        }

        [HttpPost]
        [Route("createclass")]
        public void CreateClass(string className)
        {
            var repo = new AppRepository(_connectionString);
            repo.CreateClass(className);
        }

        [HttpPost]
        [Route("createclasssplit")]
        public void CreateClassSplit([FromForm] int classId, [FromForm] List<int> studentIds)
        {
            var repo = new AppRepository(_connectionString);
            repo.CreateClassSplit(classId, studentIds);
        }

        [HttpPost]
        [Route("addstudents")]
        public void AddStudents([FromForm] int grade, [FromForm] List<string> names)
        {
            var repo = new AppRepository(_connectionString);
            repo.AddStudents(grade, names);
        }

        [HttpPost]
        [Route("addtocourse")]
        public void AddToCourse([FromForm] int courseId, [FromForm] List<int> studentIds)
        {
            var repo = new AppRepository(_connectionString);
            repo.AddToCourse(courseId, studentIds);
        }

        [HttpGet]
        [Route("getcourseinfo")]
        public CourseInfo GetCourseInfo(int teacherId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetCourseInfo(teacherId);
        }

        [HttpGet]
        [Route("getstudentsbycourse")]
        public List<Student> GetStudentsByCourse(int courseId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetStudentsByCourse(courseId);
        }

        [HttpPost]
        [Route("enterattendance")]
        public void EnterAttendance([FromBody] List<AttendanceRecord> attendanceRecords)
        {
            var repo = new AppRepository(_connectionString);
            repo.EnterAttendance(attendanceRecords);
        }

        [HttpGet]
        [Route("getstudentbyid")]
        public Student GetStudentById(int studentId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetStudentById(studentId);
        }

        [HttpGet]
        [Route("getcoursesforstudent")]
        public List<CourseInfo> GetCoursesForStudent(int studentId)
        {
            var repo = new AppRepository(_connectionString);
            return repo.GetCoursesForStudent(studentId);
        }

        [HttpPost]
        [Route("tookattendance")]
        public void TookAttendance(string date, int courseId, TimeSpan startTime, TimeSpan endTime)
        {
            var repo = new AppRepository(_connectionString);
            DateTime formattedDate = DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            repo.TookAttendance(formattedDate, courseId, startTime, endTime);
        }

        [HttpGet]
        [Route("getcurrentperiodinfo")]
        public List<CourseInfo> GetCurrentPeriodInfo(DateTime utcDateTime)
        {
            var repo = new AppRepository(_connectionString);
            DateTime estDateTime = TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
            return repo.GetCurrentPeriodInfo(estDateTime);

        }

        [HttpGet]
        [Route("getperiodinfo")]
        public List<CourseInfo> GetPeriodInfo(DateTime utcDateTime, string startTime, string endTime)
        {
            var repo = new AppRepository(_connectionString);
            DateTime estDateTime = TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
            return repo.GetPeriodInfo(estDateTime, startTime, endTime);

        }

        [HttpGet]
        [Route("getattendancetakeninfo")]
        public List<int> GetAttendanceTakenInfo(DateTime utcDateTime)
        {
            var repo = new AppRepository(_connectionString);
            DateTime estDateTime = TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
            return repo.GetAttendanceTakenInfo(estDateTime);
        }

        #region Upload Excel Stuff
        [HttpPost]
        [Route("uploadstudents")]
        public async Task<IActionResult> UploadExcel(IFormFile file)
        {
            var repo = new AppRepository(_connectionString);

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                if (!IsExcelFile(file))
                {
                    return BadRequest("Invalid file type. Please upload an Excel spreadsheet.");
                }

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets[0];
                        var rowCount = worksheet.Dimension.Rows;

                        for (int row = 2; row <= rowCount; row++)
                        {
                            var lastName = worksheet.Cells[row, 1].Text;
                            var firstName = worksheet.Cells[row, 2].Text;

                            if (!string.IsNullOrEmpty(lastName) && !string.IsNullOrEmpty(firstName))
                            {
                                // Combine LastName and FirstName into a single formatted string
                                var fullName = $"{lastName}, {firstName}";

                                // Create a student object with the combined name
                                var student = new Student
                                {
                                    Name = fullName
                                    //Grade = grade
                                };


                                // Add the student to the repository
                                await repo.AddStudentAsync(student);
                            }

                        }
                    }

                    return Ok("File uploaded and student records saved successfully.");
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error processing Excel file: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the Excel file.");
            }
        }

        private bool IsExcelFile(IFormFile file)
        {
            var allowedContentTypes = new[] { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
            return Array.Exists(allowedContentTypes, type => type.Equals(file.ContentType, StringComparison.OrdinalIgnoreCase));
        }
        #endregion

        
    }
}
