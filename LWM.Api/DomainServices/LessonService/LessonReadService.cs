using LWM.Data.Contexts;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LWM.Api.DomainServices.LessonService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using System.Linq.Expressions;

namespace LWM.Api.DomainServices.LessonService
{
    public class LessonReadService : ILessonReadService
    {
        private CoreContext _context { get; set; }

        public LessonReadService(CoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Lesson>> GetLessons(Expression<Func<LWM.Data.Models.Lesson, bool>> filter = null)
        {
            if (filter == null)
                return await _context.Lessons.Select(x => new Lesson { Id = x.Id, Name = x.Name, LessonNo = x.LessonNo }).ToListAsync();

            return await _context.Lessons.Where(filter).Select(
                x => new Lesson { Id = x.Id, Name = x.Name, LessonNo = x.LessonNo }).ToListAsync();
        }
    }
}
