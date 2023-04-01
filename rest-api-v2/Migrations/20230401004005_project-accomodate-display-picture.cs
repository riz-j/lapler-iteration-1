using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapiv2.Migrations
{
    /// <inheritdoc />
    public partial class projectaccomodatedisplaypicture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisplayPicture",
                table: "Projects",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayPicture",
                table: "Projects");
        }
    }
}
