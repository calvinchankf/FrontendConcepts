import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRunning) return;
      setDuration((prevTimeElapsed) => prevTimeElapsed + 10);
    }, 10);
    return () => clearInterval(interval);
  });

  const genButtonDiv = () => {
    if (!isRunning) {
      return <button onClick={() => setIsRunning(true)}>Start</button>;
    }
    return <button onClick={() => setIsRunning(false)}>Pause</button>;
  };

  return (
    <div>
      <FormattedTimeDiv duration={duration} />
      <div>
        {genButtonDiv()}
        <button
          onClick={() => {
            setDuration(0);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
