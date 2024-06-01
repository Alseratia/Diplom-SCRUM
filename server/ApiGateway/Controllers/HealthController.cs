using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers;

 [ApiController]
 [Route("api/v1")]
 public class HealthController : ControllerBase
 {
   [HttpGet("/health")]
   public ActionResult Health()
   {
     return Ok();
   }
 }