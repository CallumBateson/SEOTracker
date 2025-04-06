import { WatcherDto } from "./api/client";

interface WatcherRowProps {
    watcher: WatcherDto;
    onSelect: (watcher: WatcherDto) => void;
    onDelete: (watcher: WatcherDto) => void;  // New prop for delete action
}

const WatcherRow = ({ watcher, onSelect, onDelete }: WatcherRowProps) => {
    return (
        <tr style={{ cursor: "pointer" }}>
            <td>{watcher.name}</td>
            <td>{watcher.searchTerm}</td>
            <td>{watcher.targetUrl}</td>
            <td className="actions">
                <button 
                    onClick={(e) => { e.stopPropagation(); onSelect(watcher); }} 
                    className="btn btn-view"
                >
                    View Results
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(watcher); }} 
                    className="btn btn-delete"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default WatcherRow;