import { useEffect, useRef, useState } from 'react';

const CENTI_IN_MS = 10;
const SEC_IN_MS = 1000;
const MINUTE_IN_MS = 60 * SEC_IN_MS;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;

const FormattedTimeDiv = ({ duration }) => {
  const format = (x) => Math.floor(x).toString().padStart(2, '0');

  const hour = format(duration / HOUR_IN_MS);
  const minute = format((duration % HOUR_IN_MS) / MINUTE_IN_MS);
  const seconds = format((duration % MINUTE_IN_MS) / SEC_IN_MS);
  const centi = format((duration % SEC_IN_MS) / CENTI_IN_MS);

  return <div>{`${hour} hr: ${minute} min: ${seconds} sec: ${centi}`}</div>;
};

export default function Stopwatch() {
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const lastTickRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      return window.clearInterval(intervalRef.current);
    }
    // start a timer
    lastTickRef.current = Date.now();

    intervalRef.current = window.setInterval(() => {
      // find the delta between now and the last tick
      const now = Date.now();
      const delta = now - lastTickRef.current;
      setDuration((prev) => prev + delta);

      // record every last tick for the next interval call
      lastTickRef.current = now;
    }, 10); // 10ms looks the same as 1ms for human eyes, but it is less demanding for react rendering

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const genButtonDiv = () => {
    if (!isRunning) {
      return <button onClick={() => setIsRunning(true)}>Start</button>;
    }
    return <button onClick={() => setIsRunning(false)}>Pause</button>;
  };

  const resetOnClick = () => {
    setDuration(0);
    setIsRunning(false);
  };

  return (
    <div>
      <FormattedTimeDiv duration={duration} />
      <div>
        {genButtonDiv()}
        <button onClick={resetOnClick}>Reset</button>
      </div>
    </div>
  );
}
