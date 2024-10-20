namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class HideUnusedFeild : DbMigration
    {
        public override void Up()
        {
            DropColumn("public.Pizzas", "IdClientRateJson");
            DropColumn("public.Pizzas", "ClientRateJson");
            DropColumn("public.Pizzas", "Rating");
        }
        
        public override void Down()
        {
            AddColumn("public.Pizzas", "Rating", c => c.Double(nullable: false));
            AddColumn("public.Pizzas", "ClientRateJson", c => c.String());
            AddColumn("public.Pizzas", "IdClientRateJson", c => c.String());
        }
    }
}
