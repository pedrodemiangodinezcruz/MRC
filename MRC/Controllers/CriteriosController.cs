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
    public class CriteriosController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CriteriosController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {

            string query = @"
                   SELECT Id, financieroCatastrofico, financieroCritico, financieroImportante, financieroDebil, financieroMarginal, cumplimientoCatastrofico,
            cumplimientoCritico, cumplimientoImportante, cumplimientoDebil, cumplimientoMarginal, operacionalCatastrofico,
			operacionalCritico, operacionalImportante, operacionalDebil, operacionalMarginal FROM dbo.Criterios";
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
        public JsonResult Post(Criterios criterio)
        {

            string query = @"
                   insert into dbo.Criterios (financieroCatastrofico, financieroCritico, financieroImportante, financieroDebil, financieroMarginal, cumplimientoCatastrofico,
            cumplimientoCritico, cumplimientoImportante, cumplimientoDebil, cumplimientoMarginal, operacionalCatastrofico,
			operacionalCritico, operacionalImportante, operacionalDebil, operacionalMarginal ) values 
                     (
                        '" + criterio.FinancieroCatastrofico + @"'
                        ,'" + criterio.FinancieroCritico + @"'
                        ,'" + criterio.FinancieroImportante + @"'
                        ,'" + criterio.FinancieroDebil + @"'
                        ,'" + criterio.FinancieroMarginal + @"'
                        ,'" + criterio.CumplimientoCatastrofico + @"'
                        ,'" + criterio.CumplimientoCritico + @"'
                        ,'" + criterio.CumplimientoImportante + @"'
                        ,'" + criterio.CumplimientoDebil + @"'
                        ,'" + criterio.CumplimientoMarginal + @"'
                        ,'" + criterio.OperacionalCatastrofico + @"'
                        ,'" + criterio.OperacionalCritico + @"'
                        ,'" + criterio.OperacionalImportante + @"'
                        ,'" + criterio.OperacionalDebil + @"'
                        ,'" + criterio.OperacionalMarginal + @"'
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

            return new JsonResult("Criterio añadido exitosamente");
        }
        [HttpPut]
        public JsonResult Put(Criterios criterio)
        {

            string query = @"
                    update  dbo.Criterios set
                    financieroCatastrofico = '" + criterio.FinancieroCatastrofico + @"'
                    ,financieroCritico = '" + criterio.FinancieroCritico + @"'
                    ,financieroImportante = '" + criterio.FinancieroImportante + @"'
                    ,financieroDebil = '" + criterio.FinancieroDebil + @"'
                    ,financieroMarginal = '" + criterio.FinancieroMarginal + @"'
                    ,cumplimientoCatastrofico = '" + criterio.CumplimientoCatastrofico + @"'
                    ,cumplimientoCritico = '" + criterio.CumplimientoCritico + @"'
                    ,cumplimientoImportante = '" + criterio.CumplimientoImportante + @"'
                    ,cumplimientoDebil = '" + criterio.CumplimientoDebil + @"'
                    ,cumplimientoMarginal = '" + criterio.CumplimientoMarginal + @"'
                    ,operacionalCatastrofico = '" + criterio.OperacionalCatastrofico + @"'
                    ,operacionalCritico = '" + criterio.OperacionalCritico + @"'
                    ,operacionalImportante = '" + criterio.OperacionalImportante + @"'
                    ,operacionalDebil = '" + criterio.OperacionalDebil + @"'
                    ,operacionalMarginal = '" + criterio.OperacionalMarginal + @"'
                    where Id = " + criterio.Id + @"
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

            return new JsonResult("Criterio editado exitosamente");
        }
        [HttpDelete("{Id}")]
        public JsonResult Delete(int Id)
        {

            string query = @"
                    delete from  dbo.Criterios
                    where Id = " + Id + @"
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

            return new JsonResult("Criterio eliminado exitosamente");
        }
}
}

