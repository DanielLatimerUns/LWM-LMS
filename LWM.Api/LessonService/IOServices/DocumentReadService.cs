using LWM.Data.Contexts;

namespace LWM.Api.LessonService.IOServices
{
    public class DocumentReadService
    {
        private CoreContext _context { get; set; }

        public DocumentReadService(CoreContext context)
        {
            _context = context;
        }

        public GetDocumentsById(int id)

    }
}
