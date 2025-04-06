import { useState } from 'react';
import './App.css';
import { WatcherDto } from './api/client';
import WatchersTable from './WatchersTable';
import WatcherResults from './WatcherResults';

const App = () => {

    const [selectedWatcher, setSelectedWatcher] = useState<WatcherDto>();

    return (
        <div>
            <h1 id="Title">SEO Tracking</h1>
            { 
                selectedWatcher == undefined 
                    ? <WatchersTable onSelect={setSelectedWatcher}/>
                    : <WatcherResults watcher={selectedWatcher} navigateBack={() => setSelectedWatcher(undefined)} />
            }
        </div>
    );
};

export default App;