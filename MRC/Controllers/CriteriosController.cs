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
    public class CrtieriosCotroller : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CrtieriosCotroller(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {

            string query = @"
                   SELECT Id, finacieroCatastrofico, finacieroCritico, finacieroImportante, finacieroDebil, finacieroMarginal, cumplimientoCatastrofico,
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
                   insert into dbo.Criterios (finacieroCatastrofico, finacieroCritico, finacieroImportante, finacieroDebil, finacieroMarginal, cumplimientoCatastrofico,
            cumplimientoCritico, cumplimientoImportante, cumplimientoDebil, cumplimientoMarginal, operacionalCatastrofico,
			operacionalCritico, operacionalImportante, operacionalDebil, operacionalMarginal ) values 
                     (
                        '" + criterio.finacieroCatastrofico + @"'
                        ,'" + criterio.FinacieroCritico + @"'
                        ,'" + criterio.FinacieroImportante + @"
                        ,'" + criterio.FinacieroDebil + @"'
                        ,'" + criterio.FinacieroMarginal + @"'
                        ,'" + criterio.CumplimientoCatastrofico + @"'
                        ,'" + criterio.CumplimientoCritico + @"'
                        ,'" + criterio.CumplimientoImportante + @"'
                        ,'" + criterio.CumplimientoDebil + @"'
                        ,'" + criterio.CumplimientoMarginal + @"'
                        ,'" + criterio.OperacionalCatastrofico + @"'
                        ,'" + criterio.OperacionalCritico + @"'
                        ,'" + criterio.OperacionalImportante + @"'
                        ,'" + criterio.OperacionalDebil + @"'
                        ,'" + criterio.OperacionalMarginal + @"''
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

            return new JsonResult("Criterios añadido exitosamente");
        }
        [HttpPut]
        public JsonResult Put(Criterios criterio)
        {

            string query = @"
                    update  dbo.Criterios set
                    idRiesgoAsociado = '" + criterio.FinacieroCatastrofico + @"'
                    ,idRiesgoAsociado2 = '" + criterio.FinacieroCritico + @"'
                    ,idRiesgoAsociado3 = '" + criterio.FinacieroImportante + @"'
                    ,idRiesgoAsociado4 = '" + criterio.FinacieroDebil + @"'
                    ,idRiesgoAsociado5 = '" + criterio.FinacieroMarginal + @"'
                    ,idRiesgoAsociado6 = '" + criterio.CumplimientoCatastrofico + @"'
                    ,idRiesgoAsociado7 = '" + criterio.CumplimientoCritico + @"'
                    ,idRiesgoAsociado8 = '" + criterio.CumplimientoImportante + @"'
                    ,idRiesgoAsociado9 = '" + criterio.CumplimientoDebil + @"'
                    ,idRiesgoAsociado10 = '" + criterio.CumplimientoMarginal + @"'
                    ,idControlAsociado = '" + criterio.OperacionalCatastrofico + @"'
                    ,idControlAsociado2 = '" + criterio.OperacionalCritico + @"'
                    ,idControlAsociado3 = '" + criterio.OperacionalImportante + @"'
                    ,idControlAsociado4 = '" + criterio.OperacionalDebil + @"'
                    ,idControlAsociado5 = '" + criterio.OperacionalMarginal + @"'
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

