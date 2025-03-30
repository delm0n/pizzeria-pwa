namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addDelivery : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Orders", "DeliveryPrice", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("public.Orders", "DeliveryPrice");
        }
    }
}
