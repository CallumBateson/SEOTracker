import { useEffect, useState } from 'react';
import './App.css';
import { WatcherClient, WatcherDto } from './api/client';

interface WatcherRowProps {
    watcher: WatcherDto,
    onSelect: (watcher: WatcherDto) => void
}

const WatcherRow = ({ watcher, onSelect }: WatcherRowProps) => {
    return (
        <tr onClick={() => onSelect(watcher)} style={{ cursor: "pointer" }}>
            <td>{watcher.name}</td>
            <td>{watcher.searchTerm}</td>
            <td>{watcher.targetUrl}</td>
        </tr>
    );
};

const WatchersTable = ({ onSelect } : { onSelect: (watcher: WatcherDto) => void }) => {
    const [watchers, setWatchers] = useState<WatcherDto[]>();
    const client = new WatcherClient("https://localhost:7255");

    useEffect(() => {
        populateWatcherData();
    }, []);

    if (watchers === undefined) {
        return <p><em>Loading...</em></p>;
    }

    return (
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Search Term</th>
                    <th>Target URL</th>
                </tr>
            </thead>
            <tbody>
                {watchers.map(watcher => (
                    <WatcherRow key={watcher.id} watcher={watcher} onSelect={onSelect} />
                ))}
            </tbody>
        </table>
    );

    async function populateWatcherData() {
        var watcherData = await client.list();
        setWatchers(watcherData);
    }
};

export default WatchersTable;