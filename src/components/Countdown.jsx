import { useEffect, useState } from "react";
import { anniversary } from "../data/story.js";

function diff() {
  const ms = anniversary.getTime() - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

export default function Countdown() {
  const [t, setT] = useState(diff);

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section countdown">
      <h2 className="section__title">Hamara pehla saal</h2>

      {t ? (
        <>
          <p className="section__lead">
            13 December ko hamare I love you ko ek saal ho jayega. Bas itna intezaar:
          </p>
          <div className="clock" role="timer">
            {[
              ["din", t.days],
              ["ghante", t.hours],
              ["minute", t.mins],
              ["second", t.secs],
            ].map(([label, value]) => (
              <div key={label} className="clock__cell">
                <b>{String(value).padStart(2, "0")}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="section__lead">Aaj hamare pyaar ko 1 saal ho gaya. Happy anniversary, Pallu 💞</p>
      )}
    </section>
  );
}
