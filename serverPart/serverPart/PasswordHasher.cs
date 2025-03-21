
namespace serverPart
{
    public class PasswordHasher
    {
        // Хеширование пароля
        public static string HashPassword ( string password )
        {
            return BCrypt.Net.BCrypt.HashPassword ( password, BCrypt.Net.BCrypt.GenerateSalt ( ) );
        }

        // Проверка пароля
        public static bool VerifyPassword ( string password, string hashedPassword )
        {
            return BCrypt.Net.BCrypt.Verify ( password, hashedPassword );
        }
    }
}
