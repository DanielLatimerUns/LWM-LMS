using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Data.Models
{
    public class Curriculum
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string NativeLanguage { get; set; }

        public string Targetlanguage { get; set; }

        public AzureObjectLink? AzureObjectLink { get; set; }

        public ICollection<Lesson>? Lessons { get; set; }
    }
}
