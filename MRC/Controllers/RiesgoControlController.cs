using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using MRC.Models;

namespace MRC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RiesgoControlController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RiesgoControlController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {

            string query = @"
                   SELECT Id, idRiesgoAsociado, idRiesgoAsociado2, idRiesgoAsociado3, idRiesgoAsociado4,
                    idRiesgoAsociado5, idRiesgoAsociado6, idRiesgoAsociado7, idRiesgoAsociado8, idRiesgoAsociado9,
                    idRiesgoAsociado10, macroProceso, proceso, subProceso, idControl, general, descripcion
                    , evidencia, segregacion, documentacion, tipoControl, naturalezaAdecuada, naturalezaControl, tipoAdecuado, frecuenciaControl, 
                    frecuenciaAdecuada, responsable, responsabilidadControl, generacionEvidencia, diseñoControl, controlClave,
                    controlFraude, estrategiaMonitoreo, cobertura, estrategia, responsableTratamiento, descripcionTratamiento,
                    calificacionControl, coberturaPonderada , coberturaTotal , nivelCobertura, 
                    causasAdjuntas, observaciones FROM dbo.controlRiesgo";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MRCAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);

        }

        [HttpPost]
        public JsonResult Post(ControlRiesgo controlRiesgo)
        {

            string query = @"
                   insert into dbo.controlRiesgo (idRiesgoAsociado, idRiesgoAsociado2, idRiesgoAsociado3, idRiesgoAsociado4,
                    idRiesgoAsociado5, idRiesgoAsociado6, idRiesgoAsociado7, idRiesgoAsociado8, idRiesgoAsociado9,
                    idRiesgoAsociado10, macroProceso, proceso
                    ,subProceso, idControl, general, descripcion, evidencia, segregacion, documentacion,
                    tipoControl, naturalezaAdecuada, naturalezaControl, tipoAdecuado, frecuenciaControl, 
                    frecuenciaAdecuada, responsable, responsabilidadControl, generacionEvidencia, diseñoControl,
                    controlClave, controlFraude, estrategiaMonitoreo,cobertura, estrategia, responsableTratamiento,
                    descripcionTratamiento, calificacionControl, coberturaPonderada, coberturaTotal, nivelCobertura,
                    causasAdjuntas, observaciones) values 
                     (
                        '" + controlRiesgo.IdRiesgoAsociado + @"'
                        ,'" + controlRiesgo.IdRiesgoAsociado2 + @"'
                         ,'" + controlRiesgo.IdRiesgoAsociado3 + @"'
                         ,'" + controlRiesgo.IdRiesgoAsociado4 + @"'
                         ,'" + controlRiesgo.IdRiesgoAsociado5 + @"'
                         ,'" + controlRiesgo.IdRiesgoAsociado6 + @"'
                         ,'" + controlRiesgo.IdRiesgoAsociado7 + @"'
                         ,'" + controlRiesgo.IdRiesgoAsociado8 + @"'
                         ,'" + controlRiesgo.IdRiesgoAsociado9 + @"'
                         ,'" + controlRiesgo.IdRiesgoAsociado10 + @"'
                        ,'" + controlRiesgo.MacroProceso + @"'
                        ,'" + controlRiesgo.Proceso + @"'
                        ,'" + controlRiesgo.SubProceso + @"'
                        ,'" + controlRiesgo.IdControl + @"'
                        ,'" + controlRiesgo.General + @"'
                        ,'" + controlRiesgo.Descripcion + @"'
                        ,'" + controlRiesgo.Evidencia + @"'
                        ,'" + controlRiesgo.Segregacion + @"'
                        ,'" + controlRiesgo.Documentacion + @"'
                        ,'" + controlRiesgo.TipoControl + @"'
                        ,'" + controlRiesgo.NaturalezaAdecuada + @"'
                        ,'" + controlRiesgo.NaturalezaControl + @"'
                        ,'" + controlRiesgo.TipoAdecuado + @"'
                        ,'" + controlRiesgo.FrecuenciaControl + @"'
                        ,'" + controlRiesgo.FrecuenciaAdecuada + @"'
                        ,'" + controlRiesgo.Responsable + @"'
                        ,'" + controlRiesgo.ResponsabilidadControl + @"'
                        ,'" + controlRiesgo.GeneracionEvidencia + @"'
                        ,'" + controlRiesgo.DiseñoControl + @"'
                        ,'" + controlRiesgo.ControlClave + @"'
                        ,'" + controlRiesgo.ControlFraude + @"'
                        ,'" + controlRiesgo.EstrategiaMonitoreo + @"'
                        ,'" + controlRiesgo.Cobertura + @"'
                        ,'" + controlRiesgo.Estrategia + @"'
                        ,'" + controlRiesgo.ResponsableTratamiento + @"'
                        ,'" + controlRiesgo.DescripcionTratamiento + @"'
                        ,'" + controlRiesgo.CalificacionControl + @"'
                        ,'" + controlRiesgo.CoberturaPonderada + @"'
                        ,'" + controlRiesgo.CoberturaTotal + @"'
                        ,'" + controlRiesgo.NivelCobertura+ @"'
                        ,'" + controlRiesgo.CausasAdjuntas + @"'
                        ,'" + controlRiesgo.Observaciones + @"'
                       )
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MRCAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Control de Riesgo dado de alta exitosamente");
        }
        [HttpPut]
        public JsonResult Put(ControlRiesgo controlRiesgo)
        {

            string query = @"
                    update  dbo.controlRiesgo set
                        idRiesgoAsociado = '" + controlRiesgo.IdRiesgoAsociado + @"'
                        ,idRiesgoAsociado2 = '" + controlRiesgo.IdRiesgoAsociado2 + @"'
                        ,idRiesgoAsociado3 = '" + controlRiesgo.IdRiesgoAsociado3 + @"'
                        ,idRiesgoAsociado4 = '" + controlRiesgo.IdRiesgoAsociado4 + @"'
                        ,idRiesgoAsociado5 = '" + controlRiesgo.IdRiesgoAsociado5 + @"'
                        ,idRiesgoAsociado6 = '" + controlRiesgo.IdRiesgoAsociado6 + @"'
                        ,idRiesgoAsociado7 = '" + controlRiesgo.IdRiesgoAsociado7 + @"'
                        ,idRiesgoAsociado8 = '" + controlRiesgo.IdRiesgoAsociado8 + @"'
                        ,idRiesgoAsociado9 = '" + controlRiesgo.IdRiesgoAsociado9 + @"'
                        ,idRiesgoAsociado10 = '" + controlRiesgo.IdRiesgoAsociado10 + @"'
                        ,macroProceso = '" + controlRiesgo.MacroProceso + @"'
                        ,proceso ='" + controlRiesgo.Proceso + @"'
                        ,subProceso ='" + controlRiesgo.SubProceso + @"'
                        ,idControl ='" + controlRiesgo.IdControl + @"'
                        ,general ='" + controlRiesgo.General + @"'
                        ,descripcion ='" + controlRiesgo.Descripcion + @"'
                        ,evidencia ='" + controlRiesgo.Evidencia + @"'
                        ,segregacion ='" + controlRiesgo.Segregacion + @"'
                        ,documentacion ='" + controlRiesgo.Documentacion + @"'
                        ,tipoControl ='" + controlRiesgo.TipoControl + @"'
                        ,naturalezaAdecuada ='" + controlRiesgo.NaturalezaAdecuada + @"'
                        ,naturalezaControl ='" + controlRiesgo.NaturalezaControl + @"'
                        ,tipoAdecuado ='" + controlRiesgo.TipoAdecuado + @"'
                        ,frecuenciaControl ='" + controlRiesgo.FrecuenciaControl + @"'
                        ,frecuenciaAdecuada ='" + controlRiesgo.FrecuenciaAdecuada + @"'
                        ,responsable ='" + controlRiesgo.Responsable + @"'
                        ,responsabilidadControl ='" + controlRiesgo.ResponsabilidadControl + @"'
                        ,generacionEvidencia ='" + controlRiesgo.GeneracionEvidencia + @"'
                        ,controlClave ='" + controlRiesgo.ControlClave + @"'
                        ,controlFraude='" + controlRiesgo.ControlFraude + @"'
                        ,cobertura ='" + controlRiesgo.Cobertura + @"'
                        ,estrategia ='" + controlRiesgo.Estrategia + @"'
                        ,responsableTratamiento ='" + controlRiesgo.ResponsableTratamiento + @"'
                        ,descripcionTratamiento ='" + controlRiesgo.DescripcionTratamiento + @"'
                        ,calificacionControl ='" + controlRiesgo.CalificacionControl + @"'
                        ,coberturaPonderada ='" + controlRiesgo.CoberturaPonderada + @"'
                        ,coberturaTotal ='" + controlRiesgo.CoberturaTotal + @"'
                        ,NivelCobertura ='" + controlRiesgo.NivelCobertura + @"'
                        ,causasAdjuntas='" + controlRiesgo.CausasAdjuntas + @"'
                        ,observaciones ='" + controlRiesgo.Observaciones + @"'
                        where Id = " + controlRiesgo.Id + @"
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MRCAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Control de Riesgo editado exitosamente");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {

            string query = @"
                    delete from  dbo.controlRiesgo
                    where Id = " + id + @"
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MRCAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Control de Riesgo eliminado exitosamente");
        }
    }
}

