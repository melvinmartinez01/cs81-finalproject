export default function WurpPanel({lastReply, summary}) {
    return (
        <div className="pad">
            <h2>Wurp</h2>

            <div className="replyBox">
                {lastReply}
            </div>

            <p className="muted">
                <strong>Session:</strong> {summary.commands} commands / {summary.total} log items
            </p>
        </div>
    );
}