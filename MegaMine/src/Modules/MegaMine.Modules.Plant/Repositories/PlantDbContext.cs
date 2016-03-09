﻿using MegaMine.Core.Entities;
using MegaMine.Modules.Plant.Entities;
using Microsoft.Data.Entity;

namespace MegaMine.Modules.Plant.Repositories
{
    public class PlantDbContext : DbContext
    {
        public DbSet<MachineEntity> Machines { get; set; }
        public DbSet<BladeEntity> Blades { get; set; }
        public DbSet<OperatorEntity> Operators { get; set; }
        public DbSet<DressingEntity> Dressings { get; set; }
        public DbSet<BlockDressingEntity> BlockDressings { get; set; }
        public DbSet<CuttingEntity> Cuttings { get; set; }
        public DbSet<BlockCuttingEntity> BlockCuttings { get; set; }
        public DbSet<MachineStoppageEntity> MachineStoppages { get; set; }
        public DbSet<MachineOperatorEntity> MachineOperators { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //TODO: ignoring audit fields for now. This code should be removed later
            IgnoreAuditFields<MachineEntity>(builder);
            IgnoreAuditFields<BladeEntity>(builder);
            IgnoreAuditFields<OperatorEntity>(builder);
            IgnoreAuditFields<DressingEntity>(builder);
            IgnoreAuditFields<BlockDressingEntity>(builder);
            IgnoreAuditFields<CuttingEntity>(builder);
            IgnoreAuditFields<BlockCuttingEntity>(builder);
            IgnoreAuditFields<MachineStoppageEntity>(builder);
            IgnoreAuditFields<MachineOperatorEntity>(builder);

            base.OnModelCreating(builder);
        }

        private void IgnoreAuditFields<TEntity>(ModelBuilder builder) where TEntity: BaseEntity
        {
            builder.Entity<TEntity>(e =>
            {
                e.Ignore(p => p.CreatedDate);
                e.Ignore(p => p.CreatedUserId);
                e.Ignore(p => p.LastModifiedDate);
                e.Ignore(p => p.LastModifiedUserId);
            });
        }
    }
}