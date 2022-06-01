using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MRC.Models
{
    public class Causa
    {
        public int Id { get; set; }
        public string IdRiesgoAsociado { get; set; }
        public string IdControlAsociado { get; set; }
        public string Descripcion { get; set; }
    }
}
