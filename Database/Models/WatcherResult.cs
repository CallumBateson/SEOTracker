namespace Database.Models;

public class WatcherResult
{
    public int Id { get; set; }
    public int WatcherId { get; set; }
    public DateTime CreationDate { get; set; }
    public int Index { get; set; }

    public Watcher Watcher { get; set; } = null!;
}
