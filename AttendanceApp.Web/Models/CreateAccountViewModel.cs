using AttendanceApp.Data;

namespace AttendanceApp.Web.Models
{
    public class CreateAccountViewModel : User
    {
        public string Password { get; set; }
    }
}
