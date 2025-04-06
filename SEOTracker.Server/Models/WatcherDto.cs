namespace SEOTracker.Server.Models;

public class WatcherDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string SearchTerm { get; set; }
    public required string TargetUrl { get; set; }
}

