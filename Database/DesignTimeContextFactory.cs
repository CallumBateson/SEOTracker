using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Database;

public class DesignTimeContextFactory : IDesignTimeDbContextFactory<EntityContext>
{
    public EntityContext CreateDbContext(string[] _)
    {
        var options = new DbContextOptionsBuilder<EntityContext>().UseSqlServer();

        return new EntityContext(options.Options);
    }
}
