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

/*
  use `requestAnimationFrame` instead of `setInterval`
*/
export default function Stopwatch() {
  const [duration, setDuration] = useState(0);
  const [lastTick, setLastTick] = useState(null)
  const animationFrameID = useRef();

  const animateFrame = now => {
    if (lastTick === null) {
      return;
    }
    const delta = now - lastTick;
    setDuration((prev) => prev + delta);
    setLastTick(now);
    animationFrameID.current = window.requestAnimationFrame(animateFrame);
  }
  
  useEffect(() => {
    animationFrameID.current = window.requestAnimationFrame(animateFrame);
    return () => window.cancelAnimationFrame(animationFrameID.current);
  });

  const genButtonDiv = () => {
    if (lastTick === null) {
      return <button onClick={() => setLastTick(window.performance.now()) }>Start</button>;
    }
    return <button onClick={() => setLastTick(null) }>Pause</button>;
  };

  const resetOnClick = () => {
    setDuration(0);
    setLastTick(null);
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
