﻿namespace serverPart.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StatusToOrder : DbMigration
    {
        public override void Up()
        {
            AddColumn("public.Orders", "Status", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("public.Orders", "Status");
        }
    }
}
