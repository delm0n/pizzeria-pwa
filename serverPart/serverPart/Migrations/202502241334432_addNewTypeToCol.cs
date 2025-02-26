namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addNewTypeToCol : DbMigration
    {
        public override void Up()
        {
            AlterColumn("public.Promocodes", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("public.Promocodes", "Price", c => c.Int(nullable: false));
        }
    }
}
