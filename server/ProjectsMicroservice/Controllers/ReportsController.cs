using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Responses;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/project/{projectName}/")]
[ApiController]
public class ReportsController : ControllerBase
{
  [HttpGet("sprint/{sprintName}/burn-down-chart")]
  public async Task<ActionResult<BurnDownResponse>> GetSprintBurnDownChart(Guid userId, string projectName, string sprintName)
  {
    return Ok();
  }

  [HttpGet("report")]
  public async Task<ActionResult<ReportResponse>> GetProjectReport(Guid userId, string projectName)
  {
    return Ok();
  }
}