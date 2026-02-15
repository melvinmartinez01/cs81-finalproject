export default function ActivityLog({items}) {
  return (
    <div className="pad">
      <h2>Activity Log</h2>

      {items.length === 0 ? (
        <p className="muted">No activity yet. Try a command.</p>
      ) : (
        <div className="logList">
          {items.map((item) => (
            <div key={item.id} className="logItem">
              <div className="logTop">
                <strong>{item.type}</strong>
                <span className="muted">{item.item}</span>
              </div>
              <div style={{marginTop: 6}}>{item.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}