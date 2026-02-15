import RoomCard from "./RoomCard";

export default function RoomGrid({ rooms}) {
    const roomList = Object.entries(rooms);

    return (
        <div style={{padding: 16}}>
          <h2 style={{marginTop: 0}}>Rooms</h2>
          <div style={{display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"}}>
            {roomList.map(([key, room]) => (
              <RoomCard key={key} roomKey={key} room={room} />
            ))}
          </div>
        </div>
    );
}