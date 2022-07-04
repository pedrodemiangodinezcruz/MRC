using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MRC.Models
{
    public class Criterios
    {
        public int Id { get; set; }
        public string FinancieroCatastrofico { get; set; }
        public string FinancieroCritico { get; set; }
        public string FinancieroImportante { get; set; }
        public string FinancieroDebil { get; set; }
        public string FinancieroMarginal { get; set; }
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
