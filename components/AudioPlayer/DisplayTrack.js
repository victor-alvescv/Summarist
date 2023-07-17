

export default function DisplayTrack({ AudioData, audioRef, setDuration, progressBarRef }) {

 const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds)
    progressBarRef.current.max = seconds;
 }



  return (
    <div>
        <audio src={AudioData} ref={audioRef} onLoadedMetadata={onLoadedMetadata} />
    </div>
  )
}
