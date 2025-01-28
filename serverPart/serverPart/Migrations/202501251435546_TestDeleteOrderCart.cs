namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TestDeleteOrderCart : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("public.Orders", "ClientId", "public.Clients");
            DropIndex("public.Orders", new[] { "ClientId" });
            DropTable("public.Carts");
            DropTable("public.Orders");
        }
        
        public override void Down()
        {
            CreateTable(
                "public.Orders",
                c => new
                    {
                        OrderId = c.Int(nullable: false, identity: true),
                        ClientId = c.Int(),
                        PizzaIdJson = c.String(),
                        PizzaSizeIdJson = c.String(),
                        PizzaIngredientIdJson = c.String(),
                        PizzaCount = c.String(),
                        DishIdJson = c.String(),
                        DishCount = c.String(),
                        TypeOfPay = c.String(),
                        DateOrder = c.String(),
                        LastPrice = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.OrderId);
            
            CreateTable(
                "public.Carts",
                c => new
                    {
                        CartId = c.Int(nullable: false, identity: true),
                        ClientId = c.Int(nullable: false),
                        PizzaIdJson = c.String(),
                        PizzaSizeIdJson = c.String(),
                        PizzaIngredientIdJson = c.String(),
                        PizzaCount = c.String(),
                        DishIdJson = c.String(),
                        DishCount = c.String(),
                    })
                .PrimaryKey(t => t.CartId);
            
            CreateIndex("public.Orders", "ClientId");
            AddForeignKey("public.Orders", "ClientId", "public.Clients", "ClientId");
        }
    }
}
