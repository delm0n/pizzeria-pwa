namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatePromocode : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Promocodes", "Price", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("public.Promocodes", "Price");
        }
    }
}
