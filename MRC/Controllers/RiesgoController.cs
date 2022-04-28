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
    public class RiesgoController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RiesgoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            /*string query = @"
                    select idRiesgo, macroProceso, proceso,subProceso, descripcion, causa, consecuencia, tipoEvento,
                    tipoRiesgo, iff,io, riesgoFraude, probabilidad, impacto from dbo.Riesgo";*/
            string query = @"
                   SELECT Id, idRiesgo, macroProceso, proceso, subProceso, descripcion, causa, consecuencia
                    , tipoEvento, tipoRiesgo, iff, ic, ios, riesgoFraude, probabilidad, impacto FROM dbo.Riesgo"; 
             DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MRCAppCon");
            SqlDataReader myReader;
            using (SqlConnection  myCon = new SqlConnection(sqlDataSource))
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
        public JsonResult Post(Riesgo riesgo)
        {

            string query = @"
                   insert into dbo.Riesgo (idRiesgo, macroProceso, proceso
                    ,subProceso, descripcion, causa, consecuencia, tipoEvento, tipoRiesgo,
                    iff, ic, ios, riesgoFraude, probabilidad, impacto ) values 
                     (
                        '" + riesgo.IdRiesgo + @"'
                        ,'" + riesgo.MacroProceso + @"'
                        ,'" + riesgo.Proceso + @"'
                        ,'" + riesgo.SubProceso + @"'
                        ,'" + riesgo.Descripcion + @"'
                        ,'" + riesgo.Causa + @"'
                        ,'" + riesgo.Consecuencia + @"'
                        ,'" + riesgo.TipoEvento + @"'
                        ,'" + riesgo.TipoRiesgo + @"'
                        ,'" + riesgo.Iff + @"'
                        ,'" + riesgo.Ic + @"'
                        ,'" + riesgo.Ios + @"'
                        ,'" + riesgo.RiesgoFraude + @"'
                        ,'" + riesgo.Probabilidad + @"'
                        ,'" + riesgo.Impacto + @"'
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

            return new JsonResult("Riesgo añadido exitosamente");
        }
        [HttpPut]
        public JsonResult Put(Riesgo riesgo)
        {

            string query = @"
                    update  dbo.Riesgo set
                    idRiesgo = '" + riesgo.IdRiesgo + @"'
                    ,macroProceso = '" + riesgo.MacroProceso + @"'
                    ,proceso = '" + riesgo.Proceso + @"'
                    ,subProceso = '" + riesgo.SubProceso + @"'
                    ,descripcion =  '" + riesgo.Descripcion + @"'
                    ,causa =  '" + riesgo.Causa + @"'
                    ,consecuencia = '" + riesgo.Consecuencia + @"'
                    ,tipoEvento = '" + riesgo.TipoEvento + @"'
                    ,tipoRiesgo = '" + riesgo.TipoRiesgo + @"'
                    ,iff = '" + riesgo.Iff + @"'
                    ,ic = '" + riesgo.Ic + @"'
                    ,ios = '" + riesgo.Ios + @"'
                    ,riesgoFraude = '" + riesgo.RiesgoFraude + @"'
                    ,probabilidad = '" + riesgo.Probabilidad + @"'
                    ,impacto '" + riesgo.Impacto + @"'
                    where Id = " + riesgo.Id + @"
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

            return new JsonResult("Riesgo editado exitosamente");
        }
    }
}
