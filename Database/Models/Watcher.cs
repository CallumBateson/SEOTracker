namespace Database.Models;

public class Watcher
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string SearchTerm { get; set; }
    public required string TargetUrl { get; set; }
    
    public List<WatcherResult> WatcherResult { get; set; } = new();
}
