import React from "react";
import { GridLayout } from "./components/GridPad/GridLayout";
import { AudioEngine } from "./services/AudioEngine";
import { HarmonyEngine } from "./services/HarmonyEngine";
import { VoicingEngine } from "./services/VoicingEngine";
import { audioEngine } from "./lib/audio";
import { VolumeControl } from "./components/VolumeControl";
import { KeyScaleSelector } from "./components/KeyScaleSelector";
import "./styles/global.css";

const harmonyEngine = new HarmonyEngine();
const voicingEngine = new VoicingEngine();

type GridSize = 4 | 8 | 12;

export const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [gridSize, setGridSize] = React.useState<GridSize>(8);

  const handleTestSound = async () => {
    await audioEngine.testSound();
  };

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGridSize(Number(e.target.value) as GridSize);
  };

  React.useEffect(() => {
    audioEngine.initialize();
    // ダークモードの設定をローカルストレージから読み込む
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
  }, []);

  React.useEffect(() => {
    // ダークモードの設定をローカルストレージに保存
    localStorage.setItem("darkMode", isDarkMode.toString());
    // ダークモードのクラスをbodyに適用
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gradient-to-b from-indigo-50 to-white"
      }`}
    >
      <header className="glass-panel sticky top-0 z-50 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent float-animation">
              Vibe Grid
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              v1.0.0
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="glass-button p-2 rounded-full"
            >
              {isDarkMode ? "🌞" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-8">
        {/* コントロールパネル */}
        <div className="glass-panel p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-col space-y-4">
              <KeyScaleSelector />
              <button
                onClick={handleTestSound}
                className="glass-button pulse-animation"
              >
                テスト音を再生
              </button>
            </div>
            <VolumeControl />
          </div>
        </div>

        {/* グリッドパッド */}
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">グリッドパッド</h2>
            <select
              value={gridSize}
              onChange={handleGridSizeChange}
              className="glass-select"
            >
              <option value={4}>4×4</option>
              <option value={8}>8×8</option>
              <option value={12}>12×12</option>
            </select>
          </div>
          <GridLayout gridSize={gridSize} />
        </div>

        {/* 設定パネル */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-semibold mb-4">設定</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>クォンタイズ</span>
                <select className="glass-select">
                  <option>1/4</option>
                  <option>1/8</option>
                  <option>1/16</option>
                </select>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-xl font-semibold mb-4">トランスポート</h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button className="glass-button bg-gradient-to-r from-green-600 to-emerald-600">
                  再生
                </button>
                <button className="glass-button bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  停止
                </button>
                <button className="glass-button bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  ループ
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span>テンポ:</span>
                <input
                  type="number"
                  defaultValue="120"
                  className="glass-input w-20"
                />
                <span>BPM</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-xl font-semibold mb-4">エフェクト</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>リバーブ</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="0"
                  className="glass-range"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>ディレイ</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="0"
                  className="glass-range"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="glass-panel mt-8 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2024 Vibe Grid. All rights reserved.
      </footer>
    </div>
  );
};
