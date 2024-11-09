namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Updatepromocode2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Promocodes", "Discont", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("public.Promocodes", "Discont");
        }
    }
}
