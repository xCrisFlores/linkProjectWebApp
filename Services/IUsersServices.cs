using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> FindAll();
        Task<User> FindOne(int Code);
        Task<int> Insert(User user);
        Task Update(User user);
        Task Delete(int Code);
        Task<bool> Login(string Email, string pass);
    }

    
}