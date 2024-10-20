namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPromocode : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.Promocodes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Value = c.String(maxLength: 6),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("public.ConstructorPizzas", "NameSize", c => c.String());
            DropColumn("public.ConstructorPizzas", "PizzaName");
        }
        
        public override void Down()
        {
            AddColumn("public.ConstructorPizzas", "PizzaName", c => c.String());
            DropColumn("public.ConstructorPizzas", "NameSize");
            DropTable("public.Promocodes");
        }
    }
}
