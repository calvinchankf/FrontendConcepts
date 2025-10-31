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

  return <div>{`${hour} hrs: ${minute} mins: ${seconds} sec: ${centi}`}</div>;
};

const RunningTimer = ({ startTime }) => {
  const [duration, setDuration] = useState(0);
  const animationFrameID = useRef();

  const animateFrame = timeNow => {
    setDuration(timeNow - startTime);
    animationFrameID.current = window.requestAnimationFrame(animateFrame);
  }

  useEffect(() => {
    animationFrameID.current = window.requestAnimationFrame(animateFrame);
    return () => window.cancelAnimationFrame(animationFrameID.current);
  });

  return <FormattedTimeDiv duration={duration} />;
};

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const genTimerDiv = () => {
    if (startTime == null) {
      return <FormattedTimeDiv duration={0} />;
    }
    if (endTime == null) {
      return <RunningTimer startTime={startTime} />;
    }
    return <FormattedTimeDiv duration={endTime - startTime} />;
  };

  const genButtonDiv = () => {
    if (startTime == null) {
      return (
        <button onClick={() => setStartTime(performance.now())}>Start</button>
      );
    }
    if (endTime == null) {
      return (
        <button onClick={() => setEndTime(performance.now())}>Pause</button>
      );
    }
    return (
      <button
        onClick={() => {
          // previous segment = prev startTIme - endTime
          // current timer starts from performance.now()
          setStartTime((prev) => prev - endTime + performance.now());
          setEndTime(null);
        }}
      >
        Resume
      </button>
    );
  };

  const resetOnclick = () => {
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <div>
      <div>{genTimerDiv()}</div>
      <div>
        {genButtonDiv()}
        <button onClick={resetOnclick}>Reset</button>
      </div>
    </div>
  );
}
