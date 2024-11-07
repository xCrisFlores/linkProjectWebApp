using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> FindAll();
        Task<Student> FindOne(int Code);
        Task<int> Insert(Student user);
        Task Update(Student user);
    
    }

    
}