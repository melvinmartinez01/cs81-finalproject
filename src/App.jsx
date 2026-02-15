import {useMemo, useState} from "react";
import "./App.css";

import Header from "./components/Header";
import WurpPanel from "./components/WurpPanel";
import RoomGrid from "./components/RoomGrid";
import CommandConsole from "./components/CommandConsole";
import ActivityLog from "./components/ActivityLog";
import CommandHelp from "./components/CommandHelp";

const initialState = {
  rooms: {
    bathroom: {
      name: "Bathroom",
      lightsOn: false,
      supplies: {toiletPaper: 2},
      doggyDoorLocked: true,
    },
    kitchen: {
      name: "Kitchen",
      lightsOn: false,
      water: {ice: true, cold: true},
    },
    livingRoom: {
      name: "Living Room",
      lightsOn: true,
      musicPlaying: true,
      nowPlaying: "",
    },
    masterBedroom: {
      name: "Master Bedroom",
      lightsOn: false,
      bedMade: true,
      musicPlaying: false,
      nowPlaying: "",
    },
  },
  contacts: {
    samantha: "Samantha (Wifey❤️)",
    mom: "Momma",
    burgerpalace: "The Burger Palace",
  },
  lastReply: "Wurp is now online. Awaiting for your command, Master Bubba.",
  log: [],
};

function timeStamp() {
  return new Date().toLocaleString();
}

export default function App() {
  const [state, setState] = useState(initialState);
  const [commandText, setCommandText] = useState("");

  const summary = useMemo(() => {
    const total = state.log.length;
    const commands = state.log.filter((item) => item.type === "COMMAND").length;
    return {total, commands};
  }, [state.log]);

  function addLog(type, message) {
    setState((prev) => ({
      ...prev,
      log: [
        {
          id: crypto.randomUUID(),
          time: timeStamp(),
          type,
          message,
        },
        ...prev.log,
      ],
    }));
  }

  function setReply(text) {
    setState((prev) => ({
      ...prev,
      lastReply: text,
    }));
  }

function handleSubmitCommand(e) {
  e.preventDefault();
  const raw = commandText.trim();

  if (!raw) {
    setReply("Sir… issuing an empty command is an interesting strategy.");
    return;
  }

  const cmd = raw.toLowerCase();
  addLog("COMMAND", raw);

  // helper: update a specific room safely
  function updateRoom(roomKey, updater) {
    setState((prev) => {
      const currentRoom = prev.rooms[roomKey];
      const updatedRoom = updater(currentRoom);

      return {
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomKey]: updatedRoom,
        },
      };
    });
  }

  // 1) UNLOCK DOGGY DOOR (Bathroom)
  if (cmd.includes("unlock") && cmd.includes("doggy door")) {
    updateRoom("bathroom", (room) => ({ ...room, doggyDoorLocked: false }));
    addLog("ACTION", "Doggy door unlocked (Bathroom).");
    setReply("Doggy door unlocked. Let’s hope Theo doesn’t start a side quest.");
    setCommandText("");
    return;
  }

  // 2) LOCK DOGGY DOOR (extra polish)
  if (cmd.includes("lock") && cmd.includes("doggy door")) {
    updateRoom("bathroom", (room) => ({ ...room, doggyDoorLocked: true }));
    addLog("ACTION", "Doggy door locked (Bathroom).");
    setReply("Doggy door locked. Master Theo is now secure.");
    setCommandText("");
    return;
  }

  // 3) TOILET PAPER (Bathroom)
  if (cmd.includes("toilet paper")) {
    updateRoom("bathroom", (room) => ({
      ...room,
      supplies: {
        ...room.supplies,
        toiletPaper: room.supplies.toiletPaper + 1,
      },
    }));
    addLog("ACTION", "Dispensed 1 toilet paper (Bathroom).");
    setReply("Your toilet paper sir. Try not to forget next time.");
    setCommandText("");
    return;
  }

  // 4) LIGHTS ON/OFF (Bathroom/Kitchen/Living/Master)
  const roomAliases = [
    { key: "bathroom", words: ["bathroom"] },
    { key: "kitchen", words: ["kitchen"] },
    { key: "livingRoom", words: ["living room", "livingroom"] },
    { key: "masterBedroom", words: ["master bedroom", "masterbedroom", "bedroom"] },
  ];

  const matchedRoom = roomAliases.find((r) => r.words.some((w) => cmd.includes(w)));

  if (cmd.includes("lights") && (cmd.includes("turn on") || cmd.includes("turn off")) && matchedRoom) {
    const turnOn = cmd.includes("turn on");
    updateRoom(matchedRoom.key, (room) => ({ ...room, lightsOn: turnOn }));
    addLog("ACTION", `Lights ${turnOn ? "ON" : "OFF"} (${matchedRoom.key}).`);
    setReply(turnOn ? "Lights on... Honestly Master Bubba, wear a shirt." : "Lights off. Hiding in the dark sir?");
    setCommandText("");
    return;
  }

  // 5) DISPENSE ICE WATER (Kitchen)
  if (cmd.includes("dispense") && cmd.includes("ice water")) {
    updateRoom("kitchen", (room) => ({
      ...room,
      water: { ...room.water, ice: true, cold: true },
    }));
    addLog("ACTION", "Dispensed ice water (Kitchen).");
    setReply("Ice water is ready. Hydration… what a concept.");
    setCommandText("");
    return;
  }

  // 6) PLAY MUSIC (Living/Master)
  if (cmd.includes("play") && cmd.includes("music") && matchedRoom) {
    updateRoom(matchedRoom.key, (room) => ({
      ...room,
      musicPlaying: true,
      nowPlaying: "Lo-fi (simulated)",
    }));
    addLog("ACTION", `Music started (${matchedRoom.key}).`);
    setReply("Music engaged. I’ll pretend this is tasteful.");
    setCommandText("");
    return;
  }

  // 7) CALL CONTACTS (Mom, Samantha, Burger Palace)
  if (cmd.startsWith("call ")) {
    if (cmd.includes("mom")) {
      addLog("ACTION", "Calling Mom (simulated).");
      setReply("Calling your mother.");
      setCommandText("");
      return;
    }

    if (cmd.includes("samantha")) {
      addLog("ACTION", "Calling Samantha (simulated).");
      setReply("Calling the wife Master Bubba.");
      setCommandText("");
      return;
    }

    if (cmd.includes("burger palace")) {
      addLog("ACTION", "Calling The Burger Palace (simulated): Breakfast Burrito, no cheese, all bacon.");
      setReply("Placing order: Breakfast Burrito, no cheese, all bacon. Your arteries send their regards.");
      setCommandText("");
      return;
    }
  }

  // Fallback
  addLog("INFO", "Command received but not recognized.");
  setReply("Command received but not understood. Either you're speaking in riddles—or I'm being tested.");
  setCommandText("");
}

  return (
    <div className="appShell">
      <Header />

      <main className="mainGrid">
        <section className="panel">
          <WurpPanel lastReply={state.lastReply} summary={summary} />
          <CommandHelp />
          <CommandConsole
            commandText={commandText}
            setCommandText={setCommandText}
            onSubmit={handleSubmitCommand}
          />
        </section>

        <section className="panel">
          <RoomGrid rooms={state.rooms} />
        </section>

        <section className="panel">
          <ActivityLog items={state.log} />
        </section>
      </main>
    </div>
  );
}