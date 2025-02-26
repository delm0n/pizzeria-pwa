namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateOrder : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Orders", "OrderName", c => c.String());
            AddColumn("public.Orders", "Comment", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("public.Orders", "Comment");
            DropColumn("public.Orders", "OrderName");
        }
    }
}
