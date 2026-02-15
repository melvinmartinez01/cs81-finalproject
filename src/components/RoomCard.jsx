export default function RoomCard({roomKey, room}) {
    return (
        <div style={{border: "1px solid #ddd", borderRadius: 12, padding: 12}}>
            <h3 style={{marginTop: 0}}>{room.name}</h3>
            <p><strong>Lights:</strong> {room.lightsOn ? "ON" : "OFF"}</p>

            {"supplies" in room && (
                <p><strong>Toilet Paper:</strong> {room.supplies.toiletPaper}</p>
            )}

            {"doggyDoorLocked" in room && (
                <p><strong>Doggy Door:</strong> {room.doggyDoorLocked ? "LOCKED" : "UNLOCKED"}</p>
            )}

            {"musicPlaying" in room && (
                <p><strong>Music:</strong> {room.musicPlaying ? `PLAYING (${room.nowPlaying || "unknown"})` : "OFF"}</p>
            )}

            {"water" in room && (
                <p><strong>Ice Water:</strong> {room.water.ice && room.water.cold ? "READY" : "NOT READY"}</p>
            )}

            <small style={{opacity: 0.7}}>id: {roomKey}</small>
        </div>
    );
}