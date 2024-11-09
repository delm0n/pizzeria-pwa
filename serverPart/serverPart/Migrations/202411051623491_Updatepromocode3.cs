namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Updatepromocode3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Promocodes", "Discount", c => c.Int());
            DropColumn("public.Promocodes", "Discont");
        }
        
        public override void Down()
        {
            AddColumn("public.Promocodes", "Discont", c => c.Int());
            DropColumn("public.Promocodes", "Discount");
        }
    }
}
