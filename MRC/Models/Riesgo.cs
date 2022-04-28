using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MRC.Models
{
    public class Riesgo
    {
        public int Id { get; set; }
        public string IdRiesgo { get; set; }
        public string MacroProceso { get; set; }
        public string Proceso { get; set; }
        public string SubProceso { get; set; }
        public string Descripcion { get; set; }
        public string Causa { get; set; }
        public string Consecuencia { get; set; }
        public string TipoEvento { get; set; }
        public string TipoRiesgo { get; set; }
        public string Iff { get; set; }
        public string Ic { get; set; }
        public string Ios { get; set; }
        public string RiesgoFraude { get; set; }
        public string Probabilidad { get; set; }
        public string Impacto { get; set; }

    }
}
