import './App.css';
import { WatcherDto } from './api/client';

const WatcherResults = ({ watcher, navigateBack } : { watcher: WatcherDto, navigateBack: () => void }) => {
    return (
        <div>
            <h2>Selected Watcher</h2>
            <p><strong>Name:</strong> {watcher.name}</p>
            <p><strong>ID:</strong> {watcher.id}</p>
            <button onClick={navigateBack}>Back to Table</button>
        </div>
    );
};

export default WatcherResults;
