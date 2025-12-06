using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateIndices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Product_AvailableQuantity",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_IsDeleted",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_Price",
                table: "Product");

            migrationBuilder.CreateIndex(
                name: "IX_Product_IsDeleted_AvailableQuantity_Price",
                table: "Product",
                columns: new[] { "IsDeleted", "AvailableQuantity", "Price" });

            migrationBuilder.CreateIndex(
                name: "IX_Product_Name",
                table: "Product",
                column: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Product_IsDeleted_AvailableQuantity_Price",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_Name",
                table: "Product");

            migrationBuilder.CreateIndex(
                name: "IX_Product_AvailableQuantity",
                table: "Product",
                column: "AvailableQuantity");

            migrationBuilder.CreateIndex(
                name: "IX_Product_IsDeleted",
                table: "Product",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Price",
                table: "Product",
                column: "Price");
        }
    }
}
