using Database;
using Database.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SEOTracker.Server.Models;

namespace SEOTracker.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WatcherController : ControllerBase
    {
        private readonly EntityContext _context;

        public WatcherController(EntityContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Create a new watcher.
        /// </summary>
        /// <param name="watcher">a DTO containing the data required to create a watcher.</param>
        /// <returns>The id of the new watcher</returns>
        [HttpPost]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateWatcher([FromBody] WatcherDto watcher)
        {
            var entity = new Watcher
            {
                Id = watcher.Id,
                Name = watcher.Name,
                SearchTerm = watcher.SearchTerm,
                TargetUrl = watcher.TargetUrl
            };

            _context.Watcher.Add(entity);
            await _context.SaveChangesAsync();

            // TODO: Automatically generate today's results.

            return this.Ok(entity.Id);
        }


        /// <summary>
        /// Get a list of the currently active watchers in the system
        /// </summary>
        /// <returns>A List of watchers</returns>
        [HttpGet("list")]
        [ProducesResponseType(typeof(List<WatcherDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetWatcherList()
        {
            var watchers = await _context.Watcher.Select(w => new WatcherDto
            {
                Id = w.Id,
                Name = w.Name,
                SearchTerm = w.SearchTerm,
                TargetUrl = w.TargetUrl
            }).ToListAsync();

            return this.Ok(watchers);
        }

        /// <summary>
        /// Delete the specified watcher.
        /// </summary>
        /// <param name="watcherId">The id of watcher to delete.</param>
        [HttpDelete("{watcherId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteWatcher(int watcherId)
        {
            var watcher = await _context.Watcher.SingleAsync(w => w.Id == watcherId);

            _context.Watcher.Remove(watcher);
            await _context.SaveChangesAsync();

            return this.Ok();
        }

        /// <summary>
        /// Get the index results for a specified watcher.
        /// </summary>
        /// <param name="watcherId">The id of the watcher to get the results for.</param>
        /// <returns>A List of index results, grouped by date, for the requested watcher.</returns>
        [HttpGet("{watcherId}/results")]
        [ProducesResponseType(typeof(List<WatcherResultDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetWatcherResults(int watcherId)
        {
            var results = await _context.WatcherResult
                .Where(wr => wr.WatcherId == watcherId)
                .GroupBy(wr => wr.CreationDate.Date)
                .Select(g => new WatcherResultDto
                {
                    Date = DateOnly.FromDateTime(g.Key.Date),
                    Indexes = g.Select(wr => wr.Index).ToList()
                }).ToListAsync();

            return this.Ok(results);
        }

        /// <summary>
        /// Refresh today's results for a watcher.
        /// </summary>
        /// <param name="watcherId">The id of the watcher to refresh the results for.</param>
        [HttpPut("{watcherId}/refresh")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> RefreshWatcherResults(int watcherId)
        {
            //Todo: Refresh results

            return this.Ok();
        }
    }
}
