namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updOrderAddPromocodeFK : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("public.Promocodes");
            AddColumn("public.Orders", "PromocodeId", c => c.Int());
            AddColumn("public.Promocodes", "PromocodeId", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("public.Promocodes", "PromocodeId");
            CreateIndex("public.Orders", "PromocodeId");
            AddForeignKey("public.Orders", "PromocodeId", "public.Promocodes", "PromocodeId");
            DropColumn("public.Orders", "Promocode");
            DropColumn("public.Promocodes", "Id");
        }
        
        public override void Down()
        {
            AddColumn("public.Promocodes", "Id", c => c.Int(nullable: false, identity: true));
            AddColumn("public.Orders", "Promocode", c => c.String());
            DropForeignKey("public.Orders", "PromocodeId", "public.Promocodes");
            DropIndex("public.Orders", new[] { "PromocodeId" });
            DropPrimaryKey("public.Promocodes");
            DropColumn("public.Promocodes", "PromocodeId");
            DropColumn("public.Orders", "PromocodeId");
            AddPrimaryKey("public.Promocodes", "Id");
        }
    }
}
