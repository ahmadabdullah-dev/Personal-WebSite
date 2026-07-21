using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class Mig_4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CVPublicId",
                table: "Home",
                newName: "CvPublicId");

            migrationBuilder.RenameColumn(
                name: "HeroImagePublicId",
                table: "Home",
                newName: "HomeImagePublicId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CvPublicId",
                table: "Home",
                newName: "CVPublicId");

            migrationBuilder.RenameColumn(
                name: "HomeImagePublicId",
                table: "Home",
                newName: "HeroImagePublicId");
        }
    }
}
