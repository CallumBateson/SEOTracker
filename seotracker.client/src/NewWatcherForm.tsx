import { useState } from "react";
import { WatcherDto } from "./api/client";

const NewWatcherForm = ({ onSubmit }: { onSubmit: (watcher: WatcherDto) => void }) => {

    const [newWatcher, setNewWatcher] = useState<WatcherDto>({
        id: 0,
        name: '',
        searchTerm: '',
        targetUrl: ''
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewWatcher((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newWatcher.name && newWatcher.searchTerm && newWatcher.targetUrl) {
            onSubmit(newWatcher);
            setNewWatcher({
                id: 0,
                name: '',
                searchTerm: '',
                targetUrl: ''
            });
        } else {
            alert('All fields are required');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={newWatcher.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Search Term:</label>
                <input
                    type="text"
                    name="searchTerm"
                    value={newWatcher.searchTerm}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Target URL:</label>
                <input
                    type="text"
                    name="targetUrl"
                    value={newWatcher.targetUrl}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button 
                type="submit" 
                style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1,
                    textAlign: 'center',
                }}
            >
                +
            </button>
        </form>
    );
};

export default NewWatcherForm;
