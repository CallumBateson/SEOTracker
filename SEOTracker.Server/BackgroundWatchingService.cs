namespace SEOTracker.Server;

public class BackgroundWatchingService : IHostedService, IDisposable
{
    private readonly ILogger<BackgroundWatchingService> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly Timer _timer;

    public BackgroundWatchingService(ILogger<BackgroundWatchingService> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;

        var now = DateTime.Now;
        var midnight = now.Date.AddDays(1); // Next midnight
        var initialDelay = midnight - now;  // Time until midnight

        _timer = new Timer(async _ => await this.GenerateDailyWatchResults(), null, initialDelay, Timeout.InfiniteTimeSpan);
    }

    public Task StartAsync(CancellationToken stoppingToken)
    {
        return Task.CompletedTask;
    }

    private async Task GenerateDailyWatchResults()
    {
        _logger.LogInformation("Background watcher service has begun generating results for all watchers.");

        // Set the timer to re trigger in 1 day.
        _timer.Change(TimeSpan.FromDays(1), Timeout.InfiniteTimeSpan);

        using (var scope = _serviceProvider.CreateScope())
        {
            var watcherService = scope.ServiceProvider.GetRequiredService<WatcherService>();
            await watcherService.CreateResultsForAllWatchers();
        }

        _logger.LogInformation("Background watcher service has completed generating results for all watchers.");
    }

    public Task StopAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Hosted Service is stopping.");

        _timer.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer.Dispose();
    }
}
