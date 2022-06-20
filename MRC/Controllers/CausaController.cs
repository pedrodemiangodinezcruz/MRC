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
    public class CausaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CausaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {

            string query = @"
                   SELECT Id, idRiesgoAsociado, idRiesgoAsociado2, idRiesgoAsociado3,
                    idRiesgoAsociado4, idRiesgoAsociado5, idRiesgoAsociado6, idRiesgoAsociado7,
                    idRiesgoAsociado8, idRiesgoAsociado9, idRiesgoAsociado10, idControlAsociado, descripcion FROM dbo.Causa";
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
        public JsonResult Post(Causa causa)
        {

            string query = @"
                   insert into dbo.Causa (idRiesgoAsociado,idRiesgoAsociado2, idRiesgoAsociado3,
                    idRiesgoAsociado4, idRiesgoAsociado5, idRiesgoAsociado6, idRiesgoAsociado7,
                    idRiesgoAsociado8, idRiesgoAsociado9, idRiesgoAsociado10, idControlAsociado, descripcion ) values 
                     (
                        '" + causa.IdRiesgoAsociado + @"'
                        ,'" + causa.IdRiesgoAsociado2 + @"'
                        ,'" + causa.IdRiesgoAsociado3 + @"'
                        ,'" + causa.IdRiesgoAsociado4 + @"'
                        ,'" + causa.IdRiesgoAsociado5 + @"'
                        ,'" + causa.IdRiesgoAsociado6 + @"'
                        ,'" + causa.IdRiesgoAsociado7 + @"'
                        ,'" + causa.IdRiesgoAsociado8 + @"'
                        ,'" + causa.IdRiesgoAsociado9 + @"'
                        ,'" + causa.IdRiesgoAsociado10 + @"'
                        ,'" + causa.IdControlAsociado + @"'
                        ,'" + causa.Descripcion + @"'
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

            return new JsonResult("Causa añadida exitosamente");
        }
        [HttpPut]
        public JsonResult Put(Causa causa)
        {

            string query = @"
                    update  dbo.Causa set
                    idRiesgoAsociado = '" + causa.IdRiesgoAsociado + @"'
                    ,idRiesgoAsociado2 = '" + causa.IdRiesgoAsociado2 + @"'
                    ,idRiesgoAsociado3 = '" + causa.IdRiesgoAsociado3 + @"'
                    ,idRiesgoAsociado4 = '" + causa.IdRiesgoAsociado4 + @"'
                    ,idRiesgoAsociado5 = '" + causa.IdRiesgoAsociado5 + @"'
                    ,idRiesgoAsociado6 = '" + causa.IdRiesgoAsociado6 + @"'
                    ,idRiesgoAsociado7 = '" + causa.IdRiesgoAsociado7 + @"'
                    ,idRiesgoAsociado8 = '" + causa.IdRiesgoAsociado8 + @"'
                    ,idRiesgoAsociado9 = '" + causa.IdRiesgoAsociado9 + @"'
                    ,idRiesgoAsociado10 = '" + causa.IdRiesgoAsociado10 + @"'
                    ,idControlAsociado = '" + causa.IdControlAsociado + @"'
                    ,descripcion =  '" + causa.Descripcion + @"'
                    where Id = " + causa.Id + @"
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

            return new JsonResult("Causa editada exitosamente");
        }
        [HttpDelete("{Id}")]
        public JsonResult Delete(int Id)
        {

            string query = @"
                    delete from  dbo.Causa
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

            return new JsonResult("Causa eliminada exitosamente");
        }
}
}

