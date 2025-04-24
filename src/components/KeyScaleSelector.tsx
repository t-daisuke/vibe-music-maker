import React from "react";
import { harmonyEngine } from "../lib/harmony";
import type { ScaleType } from "../lib/harmony";

const KEYS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SCALES: { value: ScaleType; label: string }[] = [
  { value: "major", label: "メジャー" },
  { value: "minor", label: "マイナー" },
  { value: "dorian", label: "ドリアン" },
  { value: "phrygian", label: "フリジアン" },
  { value: "lydian", label: "リディアン" },
  { value: "mixolydian", label: "ミクソリディアン" },
  { value: "locrian", label: "ロクリアン" },
];

export const KeyScaleSelector: React.FC = () => {
  const [key, setKey] = React.useState("C");
  const [scale, setScale] = React.useState<ScaleType>("major");

  const handleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = e.target.value;
    setKey(newKey);
    harmonyEngine.setKey(newKey);
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newScale = e.target.value as ScaleType;
    setScale(newScale);
    harmonyEngine.setScale(newScale);
  };

  return (
    <div className="flex space-x-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          キー
        </label>
        <select
          value={key}
          onChange={handleKeyChange}
          className="bg-gray-700 text-white rounded px-3 py-2"
        >
          {KEYS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          スケール
        </label>
        <select
          value={scale}
          onChange={handleScaleChange}
          className="bg-gray-700 text-white rounded px-3 py-2"
        >
          {SCALES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
