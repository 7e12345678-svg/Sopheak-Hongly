"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Sale ends at midnight
  const getTargetTime = () => {
    const now = new Date();
    const target = new Date();

    target.setHours(24, 0, 0, 0);

    return target.getTime();
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const distance = getTargetTime() - Date.now();

      if (distance <= 0) {
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        hours: Math.floor(distance / (1000 * 60 * 60)),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3">
      {[{
        label: "HRS",
        value: timeLeft.hours,
      },{
        label: "MIN",
        value: timeLeft.minutes,
      },{
        label: "SEC",
        value: timeLeft.seconds,
      }].map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-cyan-500/20 bg-black/40 px-5 py-4 text-center backdrop-blur-xl"
        >
          <div className="text-3xl font-black text-cyan-400">
            {String(item.value).padStart(2, "0")}
          </div>

          <div className="mt-1 text-xs tracking-widest text-slate-400">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}