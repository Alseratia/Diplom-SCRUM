using Microsoft.AspNetCore.Mvc;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/")]
[ApiController]
public class ReportsController : ControllerBase
{
  [HttpGet("sprint/{sprintId}/burn-down-chart")]
  public ActionResult GetBurnDownChart(string sprintId)
  {
    return Ok();
  }

  [HttpGet("project/{projectId}/report")]
  public ActionResult GetProjectReport(string projectId)
  {
    return Ok();
  }
}