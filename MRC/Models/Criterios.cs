using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MRC.Models
{
    public class Criterios
    {
        public int Id { get; set; }
        public string FinacieroCatastrofico { get; set; }
        public string FinacieroCritico { get; set; }
        public string FinacieroImportante { get; set; }
        public string FinacieroDebil { get; set; }
        public string FinacieroMarginal { get; set; }
        public string CumplimientoCatastrofico { get; set; }
        public string CumplimientoCritico { get; set; }
        public string CumplimientoImportante { get; set; }
        public string CumplimientoDebil { get; set; }
        public string CumplimientoMarginal { get; set; }
        public string OperacionalCatastrofico { get; set; }
        public string OperacionalCritico { get; set; }
        public string OperacionalImportante { get; set; }
        public string OperacionalDebil { get; set; }
        public string OperacionalMarginal { get; set; }
        
    }
}
