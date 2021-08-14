using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class PrdAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsSite",
                table: "Consumables",
                newName: "IsPrd");

            migrationBuilder.AddColumn<bool>(
                name: "IsPrd",
                table: "OrderItem",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UnitOfMeasure",
                table: "OrderItem",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPrd",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "UnitOfMeasure",
                table: "OrderItem");

            migrationBuilder.RenameColumn(
                name: "IsPrd",
                table: "Consumables",
                newName: "IsSite");
        }
    }
}
