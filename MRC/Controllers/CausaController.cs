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
                   SELECT Id, IdRiesgoAsociado, descripcion FROM dbo.Causa";
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
                   insert into dbo.Causa (idRiesgoAsociado, descripcion ) values 
                     (
                        '" + causa.IdRiesgoAsociado + @"'
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
