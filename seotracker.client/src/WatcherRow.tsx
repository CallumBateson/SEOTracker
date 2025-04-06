import { WatcherDto } from "./api/client";

interface WatcherRowProps {
    watcher: WatcherDto;
    onSelect: (watcher: WatcherDto) => void;
    onDelete: (watcher: WatcherDto) => void;  // New prop for delete action
}

const WatcherRow = ({ watcher, onSelect, onDelete }: WatcherRowProps) => {
    return (
        <tr>
            <td align="center">{watcher.name}</td>
            <td align="center">{watcher.searchTerm}</td>
            <td align="center">{watcher.targetUrl}</td>
            <td>
                <button 
                    onClick={(e) => { e.stopPropagation(); onSelect(watcher); }} 
                >
                    View Results
                </button>
                <span style={{ display: 'inline-block', width: '10px'}}/>
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(watcher); }} 
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default WatcherRow;