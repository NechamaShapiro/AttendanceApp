using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AttendanceApp.Data
{
    public class UserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddUser(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var context = new AppContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User Login(string username, string password)
        {
            var user = GetByUsername(username);
            if (user == null)
            {
                return null;
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }

            return user;

        }

        public User GetByUsername(string username)
        {
            using var ctx = new AppContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Username == username);
        }
    }
}
