namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updOrderAndClient : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Orders", "Bonus", c => c.Int(nullable: false));
            AlterColumn("public.Promocodes", "Discount", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("public.Promocodes", "Discount", c => c.Int());
            DropColumn("public.Orders", "Bonus");
        }
    }
}
