using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace restapiv2.Migrations
{
    /// <inheritdoc />
    public partial class compositeprimarykeyforuserproject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users_Projects",
                table: "Users_Projects");

            migrationBuilder.DropIndex(
                name: "IX_Users_Projects_ProjectId",
                table: "Users_Projects");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Users_Projects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users_Projects",
                table: "Users_Projects",
                columns: new[] { "ProjectId", "UserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users_Projects",
                table: "Users_Projects");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Users_Projects",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users_Projects",
                table: "Users_Projects",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Projects_ProjectId",
                table: "Users_Projects",
                column: "ProjectId");
        }
    }
}
