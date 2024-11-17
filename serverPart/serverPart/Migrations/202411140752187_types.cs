namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class types : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Pizzas", "Type", c => c.String());
            DropColumn("public.Pizzas", "PizzaType");
        }
        
        public override void Down()
        {
            AddColumn("public.Pizzas", "PizzaType", c => c.Int());
            DropColumn("public.Pizzas", "Type");
        }
    }
}
