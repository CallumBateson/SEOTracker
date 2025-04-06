import { useEffect, useState } from 'react';
import './App.css';
import { WatcherService } from './api/WatcherService';
import { DateOnly, WatcherDto, WatcherResultDto } from './api/client';

const WatcherResults = ({ watcher, navigateBack }: { watcher: WatcherDto, navigateBack: () => void }) => {
    
    const [watcherResults, setWatcherResults] = useState<WatcherResultDto[] | null>(null);
    const client = new WatcherService();

    useEffect(() => {
        populateWatcherResults(watcher.id!);
    }, []);

    return (
        <div className="watcher-results-container">
            <h2>Selected Watcher</h2>
            <p><strong>Name:</strong> {watcher.name}</p>
            <button onClick={navigateBack} className="back-button">Back to Table</button>
            <button onClick={refreshTodaysData}>Refresh Todays Data</button>
            
            {/* Loading state */}
            {watcherResults === null ? (
                <div className="loading">Loading results...</div>
            ) : (
                <div className="results-table">
                    <h3>Watcher Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Indexes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watcherResults?.map((result, index) => (
                                <tr key={index} className="result-row">
                                    <td>{formatDate(result.date)}</td>
                                    <td>
                                        {result.indexes ? (
                                            <div className="heatmap">
                                                {result.indexes.map((indexValue, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        className="heatmap-cell"
                                                        style={{ 
                                                            backgroundColor: getColorForIndex(indexValue),
                                                            width: '40px',
                                                            height: '40px',
                                                            display: 'inline-block',
                                                            marginRight: '5px',
                                                            borderRadius: '4px',
                                                            textAlign: 'center', 
                                                            verticalAlign: 'middle',
                                                            lineHeight: '40px',
                                                            color: 'white',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                    {indexValue}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            "No indexes"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    async function populateWatcherResults(watcherId: number) {
        const results = await client.results(watcherId);
        setWatcherResults(results);
    }

    async function refreshTodaysData() {
        await client.refresh(watcher.id!);
        await populateWatcherResults(watcher.id!);
    }

    function formatDate(date?: DateOnly): string {
        if (!date) return 'N/A';
        const formattedDate = new Date(date.toString()).toLocaleDateString();
        return formattedDate;
    }

    // Get a color based on the index value (0 to 100)
    function getColorForIndex(value: number): string {
        const hue = ((100 - value) / 100) * 120;  // Map the value to a hue (0 is red, 100 is green)
        return `hsl(${hue}, 100%, 50%)`;  // HSL color scale
    }
};

export default WatcherResults;