namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateConstraint : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Clients", "Bonus", c => c.Int(nullable: false));
            AddColumn("public.Clients", "Record", c => c.Int(nullable: false));
            AddColumn("public.Clients", "CanPlay", c => c.Boolean(nullable: false));
            AlterColumn("public.Clients", "FirstName", c => c.String(nullable: false));
            AlterColumn("public.Clients", "Telephone", c => c.String(nullable: false));
            AlterColumn("public.Clients", "Password", c => c.String(nullable: false));
            AlterColumn("public.Dishes", "Name", c => c.String(nullable: false));
            AlterColumn("public.Ingredients", "Name", c => c.String(nullable: false));
            AlterColumn("public.Orders", "ClientId", c => c.Int());
            AlterColumn("public.Orders", "OrderTelephone", c => c.String(nullable: false));
            AlterColumn("public.Pizzas", "PizzaName", c => c.String(nullable: false));
            AlterColumn("public.PizzaSizes", "NameSize", c => c.String(nullable: false));
            CreateIndex("public.Orders", "ClientId");
            AddForeignKey("public.Orders", "ClientId", "public.Clients", "ClientId");
        }
        
        public override void Down()
        {
            DropForeignKey("public.Orders", "ClientId", "public.Clients");
            DropIndex("public.Orders", new[] { "ClientId" });
            AlterColumn("public.PizzaSizes", "NameSize", c => c.String());
            AlterColumn("public.Pizzas", "PizzaName", c => c.String());
            AlterColumn("public.Orders", "OrderTelephone", c => c.String());
            AlterColumn("public.Orders", "ClientId", c => c.Int(nullable: false));
            AlterColumn("public.Ingredients", "Name", c => c.String());
            AlterColumn("public.Dishes", "Name", c => c.String());
            AlterColumn("public.Clients", "Password", c => c.String());
            AlterColumn("public.Clients", "Telephone", c => c.String());
            AlterColumn("public.Clients", "FirstName", c => c.String());
            DropColumn("public.Clients", "CanPlay");
            DropColumn("public.Clients", "Record");
            DropColumn("public.Clients", "Bonus");
        }
    }
}
