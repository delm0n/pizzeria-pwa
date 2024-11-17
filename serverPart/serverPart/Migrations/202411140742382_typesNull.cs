namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class typesNull : DbMigration
    {
        public override void Up()
        {
            AlterColumn("public.Pizzas", "PizzaType", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("public.Pizzas", "PizzaType", c => c.Int(nullable: false));
        }
    }
}
