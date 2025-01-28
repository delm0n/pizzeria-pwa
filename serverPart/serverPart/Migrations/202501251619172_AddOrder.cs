namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddOrder : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.OrderDetalis",
                c => new
                    {
                        OrderDetaliId = c.Int(nullable: false),
                        OrderId = c.Int(nullable: false),
                        PizzasJson = c.String(),
                        ConstructorPizzasJson = c.String(),
                        DishesJson = c.String(),
                    })
                .PrimaryKey(t => t.OrderDetaliId)
                .ForeignKey("public.Orders", t => t.OrderDetaliId)
                .Index(t => t.OrderDetaliId);
            
            CreateTable(
                "public.Orders",
                c => new
                    {
                        OrderId = c.Int(nullable: false, identity: true),
                        ClientId = c.Int(nullable: false),
                        TypeOfPay = c.String(),
                        OrderDate = c.String(),
                        LastPrice = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.OrderId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("public.OrderDetalis", "OrderDetaliId", "public.Orders");
            DropIndex("public.OrderDetalis", new[] { "OrderDetaliId" });
            DropTable("public.Orders");
            DropTable("public.OrderDetalis");
        }
    }
}
