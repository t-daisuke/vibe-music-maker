import React from "react";
import { GridLayout } from "./components/GridPad/GridLayout";
import { AudioEngine } from "./services/AudioEngine";
import { HarmonyEngine } from "./services/HarmonyEngine";
import { VoicingEngine } from "./services/VoicingEngine";
import { audioEngine } from "./lib/audio";
import { VolumeControl } from "./components/VolumeControl";
import { KeyScaleSelector } from "./components/KeyScaleSelector";

const harmonyEngine = new HarmonyEngine();
const voicingEngine = new VoicingEngine();

export const App: React.FC = () => {
  const handleTestSound = async () => {
    await audioEngine.testSound();
  };

  React.useEffect(() => {
    // オーディオエンジンの初期化
    audioEngine.initialize();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="p-6 bg-white shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-600">Vibe Grid</h1>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* コントロールパネル */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-col space-y-4">
              <KeyScaleSelector />
              <button
                onClick={handleTestSound}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                テスト音を再生
              </button>
            </div>
            <VolumeControl />
          </div>
        </div>

        {/* グリッドパッド */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            グリッドパッド
          </h2>
          <GridLayout />
        </div>

        {/* 設定パネル */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">設定</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">グリッドサイズ</span>
                <select className="bg-white border border-gray-300 rounded-lg px-3 py-1">
                  <option>4×4</option>
                  <option>8×8</option>
                  <option>12×12</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">クォンタイズ</span>
                <select className="bg-white border border-gray-300 rounded-lg px-3 py-1">
                  <option>1/4</option>
                  <option>1/8</option>
                  <option>1/16</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              トランスポート
            </h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                  再生
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  停止
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  ループ
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">テンポ:</span>
                <input
                  type="number"
                  defaultValue="120"
                  className="w-20 border border-gray-300 rounded-lg px-2 py-1"
                />
                <span className="text-gray-700">BPM</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              エフェクト
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">リバーブ</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="0"
                  className="w-32"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">ディレイ</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="0"
                  className="w-32"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
