using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Database;

public class EntityContext : DbContext
{
    public EntityContext(DbContextOptions<EntityContext> options) : base(options) {}

    public DbSet<Watcher> Watcher { get; set; }
    public DbSet<WatcherResult> WatcherResult { get; set; }
}
