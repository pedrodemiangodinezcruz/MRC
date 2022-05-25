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
                   SELECT Id, IdRiesgoAsociado, macroProceso, proceso, subProceso, idControl, general, descripcion
                    , evidencia, segregacion, documentacion, tipoControl, naturalezaAdecuada, naturalezaControl, tipoAdecuado, frecuenciaControl, 
                    frecuenciaAdecuada, responsable, responsabilidadControl, generacionEvidencia, controlClave,
                    controlFraude, cobertura, estrategia, responsableTratamiento, descripcionTratamiento,
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
                   insert into dbo.controlRiesgo (IdRiesgoAsociado, macroProceso, proceso
                    ,subProceso, idControl, general, descripcion, evidencia, segregacion, documentacion,
                    tipoControl, naturalezaAdecuada, naturalezaControl, tipoAdecuado, frecuenciaControl, 
                    frecuenciaAdecuada, responsable, responsabilidadControl, generacionEvidencia,
                    controlClave, controlFraude, cobertura, estrategia, responsableTratamiento,
                    descripcionTratamiento, causasAdjuntas, observaciones) values 
                     (
                        '" + controlRiesgo.IdRiesgoAsociado + @"'
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
                        ,'" + controlRiesgo.ControlClave + @"'
                        ,'" + controlRiesgo.ControlFraude + @"'
                        ,'" + controlRiesgo.Cobertura + @"'
                        ,'" + controlRiesgo.Estrategia + @"'
                        ,'" + controlRiesgo.ResponsableTratamiento + @"'
                        ,'" + controlRiesgo.DescripcionTratamiento + @"'
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

