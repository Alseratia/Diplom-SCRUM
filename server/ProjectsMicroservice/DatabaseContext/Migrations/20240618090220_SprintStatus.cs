using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectsMicroservice.Migrations
{
    /// <inheritdoc />
    public partial class SprintStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Sprints",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Sprints");
        }
    }
}
