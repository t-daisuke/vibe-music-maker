import React from "react";
import { GridLayout } from "./components/GridPad/GridLayout";
import { AudioEngine } from "./services/AudioEngine";
import { HarmonyEngine } from "./services/HarmonyEngine";
import { VoicingEngine } from "./services/VoicingEngine";
import { audioEngine } from "./lib/audio";
import { VolumeControl } from "./components/VolumeControl";

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
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">Vibe Grid</h1>
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={handleTestSound}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            テスト音を再生
          </button>
          <VolumeControl />
        </div>

        <div className="mb-8">
          <GridLayout />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Settings</h2>
            {/* 設定パネルコンポーネントをここに追加 */}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Transport</h2>
            {/* トランスポートコントロールをここに追加 */}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Effects</h2>
            {/* エフェクトコントロールをここに追加 */}
          </div>
        </div>
      </main>
    </div>
  );
};
