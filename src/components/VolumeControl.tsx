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
    <div className="flex flex-col space-y-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-600 tracking-wider">
          VOLUME
        </label>
        <span className="text-xs font-mono text-gray-500">{volume}dB</span>
      </div>
      <input
        type="range"
        min="-60"
        max="0"
        step="1"
        value={volume}
        onChange={handleVolumeChange}
        className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer 
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-gradient-to-br
          [&::-webkit-slider-thumb]:from-blue-400
          [&::-webkit-slider-thumb]:to-blue-600
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:shadow-blue-500/20
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:duration-200
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-webkit-slider-thumb]:hover:shadow-blue-500/30
          [&::-webkit-slider-thumb]:active:scale-95
          [&::-webkit-slider-thumb]:active:shadow-blue-500/10
          [&::-moz-range-thumb]:w-3.5
          [&::-moz-range-thumb]:h-3.5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-gradient-to-br
          [&::-moz-range-thumb]:from-blue-400
          [&::-moz-range-thumb]:to-blue-600
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:shadow-md
          [&::-moz-range-thumb]:shadow-blue-500/20
          [&::-moz-range-thumb]:transition-all
          [&::-moz-range-thumb]:duration-200
          [&::-moz-range-thumb]:hover:scale-110
          [&::-moz-range-thumb]:hover:shadow-blue-500/30
          [&::-moz-range-thumb]:active:scale-95
          [&::-moz-range-thumb]:active:shadow-blue-500/10"
      />
    </div>
  );
};
