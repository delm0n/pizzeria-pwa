namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedNewField : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Clients", "PromocodeJson", c => c.String());
            AddColumn("public.ConstructorPizzas", "Mass", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("public.ConstructorPizzas", "Mass");
            DropColumn("public.Clients", "PromocodeJson");
        }
    }
}
