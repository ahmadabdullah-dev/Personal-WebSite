using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class Mig_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CVURL",
                table: "Home",
                newName: "CvUrl");

            migrationBuilder.RenameColumn(
                name: "HeroImageURL",
                table: "Home",
                newName: "HomeImageUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CvUrl",
                table: "Home",
                newName: "CVURL");

            migrationBuilder.RenameColumn(
                name: "HomeImageUrl",
                table: "Home",
                newName: "HeroImageURL");
        }
    }
}
