export default function CommandConsole({commandText, setCommandText, onSubmit}) {
    return (
        <form onSubmit={onSubmit} style={{padding: 16}}>
            <label htmlFor="cmd"><strong>Command Console</strong></label>
            <input
                id="cmd"
                value={commandText}
                onChange={(e) => setCommandText(e.target.value)}
                placeholder='Try: "turn on living room lights"'
                style={{
                    width: "100%",
                    marginTop: 8,
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid #ddd",
                }}
            />
            <button
                type="submit"
                style={{
                    marginTop: 10,
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    cursor: "pointer",
                }}
            >
                Send Command
            </button>
        </form>
    );
}