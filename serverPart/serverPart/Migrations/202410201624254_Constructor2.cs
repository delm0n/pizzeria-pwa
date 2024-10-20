namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Constructor2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.ConstructorPizzas",
                c => new
                    {
                        PizzaId = c.Int(nullable: false, identity: true),
                        PizzaName = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.PizzaId);
            
        }
        
        public override void Down()
        {
            DropTable("public.ConstructorPizzas");
        }
    }
}
