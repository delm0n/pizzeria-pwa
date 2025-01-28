namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddOrder2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("public.OrderDetalis", "OrderDetaliId", "public.Orders");
            DropIndex("public.OrderDetalis", new[] { "OrderDetaliId" });
            AddColumn("public.Orders", "PizzasJson", c => c.String());
            AddColumn("public.Orders", "ConstructorPizzasJson", c => c.String());
            AddColumn("public.Orders", "DishesJson", c => c.String());
            AddColumn("public.Orders", "Promocode", c => c.String());
            DropTable("public.OrderDetalis");
        }
        
        public override void Down()
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
                .PrimaryKey(t => t.OrderDetaliId);
            
            DropColumn("public.Orders", "Promocode");
            DropColumn("public.Orders", "DishesJson");
            DropColumn("public.Orders", "ConstructorPizzasJson");
            DropColumn("public.Orders", "PizzasJson");
            CreateIndex("public.OrderDetalis", "OrderDetaliId");
            AddForeignKey("public.OrderDetalis", "OrderDetaliId", "public.Orders", "OrderId");
        }
    }
}
