export default function ActivityLog({items}) {
    return (
      <div style={{padding: 16}}>
        <h2 style={{marginTop: 0}}>Activity Log</h2>

        {items.length === 0 ? (
            <p>No activity yet. Try a command.</p>
        ) : (
            <div style={{display: "grid", gap: 10}}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: 12,
                        padding: 10,
                    }}
                  >
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <strong>{item.type}</strong>
                        <span style={{opacity: 0.7}}>{item.item}</span>
                    </div>
                    <div style={{marginTop: 6}}>{item.result}</div>
                  </div>
                ))} 
              </div>
            )}
        </div>
    );
}