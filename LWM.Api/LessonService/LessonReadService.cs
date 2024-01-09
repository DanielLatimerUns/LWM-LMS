using LWM.Api.Dtos;
using LWM.Data.Contexts;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LWM.Api.LessonService.Contracts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.LessonService
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
            return await _context.Lessons.Select(x => new Lesson { Id = x.Id, Name = x.Name, }).ToListAsync();
        }
    }
}
