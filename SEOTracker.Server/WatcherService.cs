using Database;
using Database.Models;
using HtmlAgilityPack;
using Microsoft.EntityFrameworkCore;

namespace SEOTracker.Server;

public class WatcherService
{
    private readonly EntityContext _context;

    public WatcherService(EntityContext context)
    {
        _context = context;
    }

    public async Task CreateWatcherResults(int watcherId)
    {
        var watcherDetails = await _context.Watcher
            .Where(w => w.Id == watcherId)
            .Select(w => new
            {
                w.TargetUrl,
                w.SearchTerm
            }).SingleAsync();

        var urls = await this.SearchGoogle(watcherDetails.SearchTerm);
        var targetIndexes = this.DetermineIndexesOfTargetUrl(urls, watcherDetails.TargetUrl);

        var existingResultsForToday = await _context.WatcherResult
            .Where(wr => wr.CreationDate.Date == DateTime.UtcNow.Date)
            .ToListAsync();

        _context.WatcherResult.RemoveRange(existingResultsForToday);

        var newResultRecords = targetIndexes.Select(index => new WatcherResult
        {
            WatcherId = watcherId,
            CreationDate = DateTime.UtcNow,
            Index = index
        }).ToList();

        _context.WatcherResult.AddRange(newResultRecords);

        await _context.SaveChangesAsync();
    }

    private async Task<List<string>> SearchGoogle(string searchTerm)
    {
        List<string> urls = new();
        string searchUrl = $"https://www.google.com/search?q={Uri.EscapeDataString(searchTerm)}&num=100";

        using HttpClient client = new();
        client.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0");

        string html = await client.GetStringAsync(searchUrl);
        HtmlDocument doc = new();
        doc.LoadHtml(html);

        foreach (var node in doc.DocumentNode.SelectNodes("//a[contains(@href, 'http')]"))
        {
            string href = node.GetAttributeValue("href", string.Empty);
            if (href.StartsWith("/url?q="))
            {
                string cleanUrl = href.Split('&')[0].Replace("/url?q=", "");
                urls.Add(cleanUrl);
            }
        }

        return urls;
    }

    private IEnumerable<int> DetermineIndexesOfTargetUrl(List<string> urls, string targetUrl)
    {
        for (int i = 0; i < urls.Count; i++)
        {
            if (urls[i].Contains(targetUrl))
            {
                yield return i;
            }
        }
    }
}

