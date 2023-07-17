import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { useRef, useState } from "react";

export default function AudioPlayer({ AudioData }) {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack AudioData={AudioData} audioRef={audioRef} setDuration={setDuration} progressBarRef={progressBarRef} />
        <Controls className="audio__controls--btn" audioRef={audioRef} progressBarRef={progressBarRef} duration={duration} setTimeProgress={setTimeProgress} />
        <ProgressBar progressBarRef={progressBarRef} audioRef={audioRef} timeProgress={timeProgress} duration={duration} />
      </div>
    </div>
  );
}
