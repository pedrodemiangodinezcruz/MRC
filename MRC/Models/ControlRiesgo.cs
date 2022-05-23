using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MRC.Models
{
    public class ControlRiesgo
    {
        public int Id { get; set; }
        public string IdRiesgoAsociado { get; set; }
        public string MacroProceso { get; set; }
        public string Proceso { get; set; }
        public string SubProceso { get; set; }
        public string IdControl { get; set; }
        public string General { get; set; }
        public string Descripcion { get; set; }
        public string Evidencia { get; set; }
        public string Segregacion { get; set; }
        public string Documentacion { get; set; }
        public string TipoControl { get; set; }
        public string NaturalezaAdecuada { get; set; }
        public string NaturalezaControl{ get; set; }
        public string TipoAdecuado { get; set; }
        public string FrecuenciaControl { get; set; }
        public string FrecuenciaAdecuada { get; set; }
        public string Responsable { get; set; }
        public string ResponsabilidadControl { get; set; }
        public string GeneracionEvidencia { get; set; }
        public string ControlClave { get; set; }
        public string ControlFraude { get; set; }
        public int Cobertura { get; set; }
        public string Estrategia { get; set; }
        public string ResponsableTratamiento { get; set; }
        public string DescripcionTratamiento { get; set; }
        public string CausasAdjuntas { get; set; }
        public string Observaciones { get; set; }
    }
}
