import React from "react";
import { audioEngine } from "../lib/audio";

export const VolumeControl: React.FC = () => {
  const [volume, setVolume] = React.useState(audioEngine.getVolume());

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioEngine.setVolume(newVolume);
  };

  return (
    <div className="flex items-center space-x-4">
      <svg
        className="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
      <input
        type="range"
        min="-60"
        max="0"
        step="1"
        value={volume}
        onChange={handleVolumeChange}
        className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <span className="w-12 text-sm text-gray-400">{volume}dB</span>
    </div>
  );
};
