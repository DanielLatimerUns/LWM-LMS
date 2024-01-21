using LWM.Api.Dtos;
using LWM.Data.Contexts;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LWM.Api.DomainServices.LessonService.Contracts;

namespace LWM.Api.DomainServices.LessonService
{
    public class LessonReadService : ILessonReadService
    {
        private CoreContext _context { get; set; }

        public LessonReadService(CoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Lesson>> GetLessons()
        {
            return await _context.Lessons.Select(x => new Lesson { Id = x.Id, Name = x.Name, LessonNo = x.LessonNo }).ToListAsync();
        }
    }
}
