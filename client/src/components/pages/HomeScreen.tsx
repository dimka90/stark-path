import { useSpawnPlayer } from "../../dojo/hooks/useSpawnPlayer";
import { useStarknetConnect } from "../../dojo/hooks/useStarknetConnect";
import useAppStore from "../../zustand/store";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Wallet, UserPlus, Gamepad2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const player = useAppStore((state) => state.player);
  const { isInitializing, initializePlayer } = useSpawnPlayer();
  const { 
    status, 
    address, 
    isConnecting, 
    handleConnect, 
    handleDisconnect 
  } = useStarknetConnect();
  
  const isConnected = status === "connected";
  const [showGameInline, setShowGameInline] = useState(true);

  const handlePlayGame = () => {
    setShowGameInline(true);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-900">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">StarkPath</h1>
              <p className="text-slate-300 text-sm">
                {isConnected ? `Connected to Katana via Dojo${address ? ` • ${address.slice(0, 6)}...${address.slice(-4)}` : ''}` : "Connect to start playing"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={isConnected ? handleDisconnect : handleConnect}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Wallet className="w-4 h-4 mr-2" />
                )}
                {isConnecting ? "Connecting..." : isConnected ? "Disconnect" : "Connect Wallet"}
              </Button>
              <Button
                onClick={initializePlayer}
                disabled={!isConnected || !!player || isInitializing}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
              >
                {isInitializing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4 mr-2" />
                )}
                {isInitializing ? "Creating..." : "Spawn Player"}
              </Button>
              <Button
                onClick={handlePlayGame}
                disabled={!player}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Play Game
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-2 max-w-6xl">
        <Card className="bg-slate-900">
          <CardContent className="p-3">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Memory Game</h2>
              <p className="text-slate-300">Test your memory skills and compete on-chain</p>
            </div>

            {/* Game Modes removed per request */}

            {/* Player Stats */}
            {player && (
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{player.games_played || 0}</div>
                    <div className="text-sm text-slate-300">Games Played</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{player.wins || 0}</div>
                    <div className="text-sm text-slate-300">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{player.losses || 0}</div>
                    <div className="text-sm text-slate-300">Losses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{player.best_level || 0}</div>
                    <div className="text-sm text-slate-300">Best Level</div>
                  </div>
                </div>
              </div>
            )}

            {/* Inline Game */}
            {showGameInline && (
              <div className="mt-1 flex justify-center">
                <iframe
                  src="/pathmemory/index.html"
                  title="StarkPath Memory Game"
                  className="w-full max-w-[820px] h-[750px] rounded-xl shadow-xl"
                />
              </div>
            )}

            {/* Status Messages */}
            {!isConnected && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-6">
                <p className="text-yellow-400 text-center">
                  🔗 Connect your wallet to start playing StarkPath Memory Game
                </p>
              </div>
            )}
            
            {isConnected && !player && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-6">
                <p className="text-blue-400 text-center">
                  👤 Create your player to start recording game results on-chain
                </p>
              </div>
            )}
            
            {player && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-6">
                <p className="text-green-400 text-center">
                  ✅ Ready to play! Your game results will be recorded on-chain
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}