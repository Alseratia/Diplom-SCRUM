using System.ComponentModel.DataAnnotations;

namespace ProjectsMicroservice.Controllers.Requests;

public class CreateSprintRequest
{
  [Required] public string Name { get; set; } = null!;
}