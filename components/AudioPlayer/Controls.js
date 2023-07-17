import React, { useEffect, useRef, useState, useCallback } from "react";
import { RiForward10Line, RiReplay10Fill } from "react-icons/ri";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

export default function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playAnimationRef = useRef();

  function togglePlayPause() {
    setIsPlaying((prev) => !prev);
  }

  function backTen() {
    audioRef.current.currentTime -= 10;
  }

  function skipTen() {
    audioRef.current.currentTime += 10;
  }

  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime;
    setTimeProgress(currentTime);
    if (currentTime) {
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );
      playAnimationRef.current - requestAnimationFrame(repeat);
    }
  }, [audioRef, progressBarRef, duration, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      playAnimationRef.current - requestAnimationFrame(repeat);
    } else {
      audioRef.current.pause();
    }
    cancelAnimationFrame(playAnimationRef.current);
  }, [isPlaying, audioRef, repeat]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button className="audio__controls--btn">
          <RiReplay10Fill onClick={backTen} className="audio__controls--icon" />
        </button>

        <button
          onClick={togglePlayPause}
          className="audio__controls--btn audio__controls--btn-play"
        >
          {isPlaying ? (
            <AiFillPauseCircle className="audio__controls--play" />
          ) : (
            <AiFillPlayCircle className="audio__controls--play" />
          )}
        </button>

        <button className="audio__controls--btn">
          <RiForward10Line
            onClick={skipTen}
            className="audio__controls--icon"
          />
        </button>
      </div>
    </div>
  );
}
