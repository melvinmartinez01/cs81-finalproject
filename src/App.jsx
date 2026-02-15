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

    if(!raw) {
      setReply("Sir... issuing an empty command might just be an interesting strategy for uh... you.");
      return;
    }

    addLog("COMMAND", raw);

    const lower = raw.toLowerCase();

    //Placeholder logic
    if (lower.includes("lights")) {
      addLog("ACTION", "Lights command received.");
      setReply("Very well, Master Bubba. Illumination protocols acknowledged.");
    } else if (lower.includes("toilet paper")) {
      addLog("ACTION", "Bathroom supply request logged.");
      setReply("Of course, Master Bubba. Because preparedness is clearly optional, apparently.");
    } else if (lower.includes("play music")) {
      addLog("ACTION", "Music command commencing.");
      setReply("Initiating music playback, Master Bubba. Because silence is just too mainstream, right?");
    } else if (lower.includes("lock doggy door")) {
      addLog("ACTION", "Doggy door lock command executed.");
      setReply("Locking the doggy door for Master Theo. Honestly, Master Bubba, you should accompany the canine for a walk or a hike instead of fattening him up.");
    } else {
      addLog("INFO", "Command logged.");
      setReply("Command received but not acknowledged, Master Bubba. Either you're speaking in tongues or I'm on a new episode of PUNK'D.");
    }

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