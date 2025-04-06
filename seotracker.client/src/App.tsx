import { useState } from 'react';
import { WatcherDto } from './api/client';
import WatchersTable from './WatchersTable';
import WatcherResults from './WatcherResults';

const App = () => {

    const [selectedWatcher, setSelectedWatcher] = useState<WatcherDto>();

    return (
        <div style={{
            backgroundColor: '#121212',
            color: '#ffffff',
            minHeight: '100vh',
            width: '100vw',
            padding: '10px',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column'
        }}>
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