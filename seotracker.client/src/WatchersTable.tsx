import { useEffect, useState } from 'react';
import { WatcherDto } from './api/client';
import { WatcherService } from './api/WatcherService';
import WatcherRow from './WatcherRow';
import NewWatcherForm from './NewWatcherForm';

const WatchersTable = ({ onSelect } : { onSelect: (watcher: WatcherDto) => void }) => {
    const [watchers, setWatchers] = useState<WatcherDto[]>();
    const client = new WatcherService();

    useEffect(() => {
        populateWatcherData();
    }, []);

    if (watchers === undefined) {
        return <p><em>Loading...</em></p>;
    }

    return (
        <>
            <NewWatcherForm onSubmit={OnNewWatcher}/>
            <div style={{ padding: "10px" }}/>
            <table aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Search Term</th>
                        <th>Target URL</th>
                    </tr>
                </thead>
                <tbody>
                    {watchers.map(watcher => (
                        <WatcherRow key={watcher.id} watcher={watcher} onSelect={onSelect} onDelete={OnDeleteWatcher} />
                    ))}
                </tbody>
            </table>
        </>
    );

    async function populateWatcherData() {
        var watcherData = await client.list();
        setWatchers(watcherData);
    }

    async function OnDeleteWatcher(watcher: WatcherDto) {
        const updatedWatchers = watchers?.filter(o => o.id !== watcher.id);
        setWatchers(updatedWatchers);
        await client.watcherDELETE(watcher.id!);
    }

    async function OnNewWatcher(watcher: WatcherDto) {
        var newWatcherId = await client.watcherPOST(watcher);
        watcher.id = newWatcherId;
        const updatedWatchers = [...watchers!, watcher];
        setWatchers(updatedWatchers);
    }
};

export default WatchersTable;