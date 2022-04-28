using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MRC.Models
{
    public class ControlRiesgo
    {
        public int controlID { get; set; }
        public string macroProceso { get; set; }
        public string proceso { get; set; }
        public string subProceso { get; set; }
        public string idControl { get; set; }
        public string general { get; set; }
        public string descripcion { get; set; }
        public string evidencia { get; set; }
        public string segregacion { get; set; }
        public string tipoControl { get; set; }
        public string naturalezaAdecuada { get; set; }
        public string naturalezaControl{ get; set; }
        public string tipoAdecuado { get; set; }
        public string frecuenciaControl { get; set; }
        public string frecuenciaAdecuada { get; set; }
        public string responsable { get; set; }
        public string responsabilidadControl { get; set; }
        public string generacionEvidencia { get; set; }
        public string controlClave { get; set; }
        public string controlFraude { get; set; }
        public int cobertura { get; set; }
        public string estrategia { get; set; }
        public string responsableTratamiento { get; set; }
        public string descripcionTratamiento { get; set; }
        public string causasAdjuntas { get; set; }
        public string observaciones { get; set; }
    }
}
