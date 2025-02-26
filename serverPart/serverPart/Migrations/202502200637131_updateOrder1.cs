namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateOrder1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Orders", "OrderTelephone", c => c.String());
            AddColumn("public.Orders", "Time", c => c.String());
            AddColumn("public.Orders", "Address", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("public.Orders", "Address");
            DropColumn("public.Orders", "Time");
            DropColumn("public.Orders", "OrderTelephone");
        }
    }
}
