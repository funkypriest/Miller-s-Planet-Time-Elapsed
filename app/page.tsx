"use client";
import NumberFlow from "@number-flow/react";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
const MOVIE_RELEASE_DATE = new Date("2014-11-06T00:00:00Z");
const MILLERS_TIME_FACTOR = 2_208_988_000;
export default function Home() {
  const [date, setDate] = useState(new Date());
  const movieDate = new Date(MOVIE_RELEASE_DATE);
  const timeElapsed = date.getTime() - movieDate.getTime();
  const timeElapsedOnMillersPlanet = timeElapsed;
  // console.log(date.getTime());
  // console.log(movieDate.getTime());
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDate(new Date());
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const [millerTime, setMillerTime] = useState({});

  useEffect(() => {
    const updateMillerTime = () => {
      const interstellarRelease = new Date("2014-11-06T00:00:00Z");
      const now = new Date();
      const earthTimeMs = now.getTime() - interstellarRelease.getTime();
      const earthYears = earthTimeMs / (1000 * 60 * 60 * 24 * 365.25);
      const millerHours = earthYears / 7;

      const millerDays = Math.floor(millerHours / 24);
      const remainingHours = Math.floor(millerHours % 24);
      const remainingMinutes = Math.floor((millerHours * 60) % 60);
      const remainingSeconds = Math.floor((millerHours * 3600) % 60);
      const remainingMilliseconds = Math.floor((millerHours * 3600000) % 1000);

      setMillerTime({
        millerDays,
        remainingHours,
        remainingMinutes,
        remainingSeconds,
        remainingMilliseconds,
      });
    };

    updateMillerTime();
    const interval = setInterval(updateMillerTime, 50); // Actualizar cada 50ms para mostrar milisegundos

    return () => clearInterval(interval);
  }, []);

  const formattedDate = formatDistance(movieDate, date);
  return (
    <div className="flex justify-center items-center h-screen space-x-2">
      <div className="time-unit">
        <span className="time-value">{millerTime.millerDays}</span>{" "}
        <span className="time-label">{"days"}</span>
      </div>
      <div className="time-unit">
        <span className="time-value">{millerTime.remainingHours}</span>{" "}
        <span className="time-label">{"hours"}</span>
      </div>
      <div className="time-unit">
        <span className="time-value">{millerTime.remainingMinutes}</span>{" "}
        <span className="time-label">{"minutes"}</span>
      </div>
      <div className="time-unit">
        <span className="time-value">
          {millerTime.remainingSeconds}.
          {millerTime.remainingMilliseconds?.toString().padStart(3, "0")}
        </span>
        <span className="time-label"> {"seconds"}</span>
      </div>
    </div>
  );
}
