namespace SEOTracker.Server.Models;

public class WatcherResultDto
{
    public DateOnly Date { get; set; }
    public required List<int> Indexes { get; set; }
}

