"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Play, Pause, RotateCcw, Settings, Gamepad2, Volume2, Maximize, Minimize, Crown } from "lucide-react"

interface GamePlayerProps {
  game: any
}

export default function GamePlayer({ game }: GamePlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [connectedControllers, setConnectedControllers] = useState<Gamepad[]>([])
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const loadGame = async () => {
      setIsLoading(true)
      setError("")

      try {
        for (let i = 0; i <= 100; i += 10) {
          setLoadingProgress(i)
          await new Promise((resolve) => setTimeout(resolve, 200))
        }

        await initializeEmulator()
        setIsLoading(false)
      } catch (err) {
        setError("Erro ao carregar o jogo. Verifique se a ROM está disponível.")
        setIsLoading(false)
      }
    }

    loadGame()
    detectControllers()

    window.addEventListener("gamepadconnected", handleControllerConnect)
    window.addEventListener("gamepaddisconnected", handleControllerDisconnect)

    return () => {
      window.removeEventListener("gamepadconnected", handleControllerConnect)
      window.removeEventListener("gamepaddisconnected", handleControllerDisconnect)
    }
  }, [game])

  const initializeEmulator = async () => {
    console.log(`[v0] Inicializando emulador para ${game.console}`)
    console.log(`[v0] Carregando ROM: ${game.rom}`)

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, 800, 600)
        ctx.fillStyle = "#fff"
        ctx.font = "24px Arial"
        ctx.textAlign = "center"
        ctx.fillText(game.title, 400, 300)
        ctx.font = "16px Arial"
        ctx.fillText("Pressione PLAY para iniciar", 400, 340)
      }
    }
  }

  const detectControllers = () => {
    const gamepads = navigator.getGamepads()
    const connected = Array.from(gamepads).filter((gamepad) => gamepad !== null) as Gamepad[]
    setConnectedControllers(connected)
  }

  const handleControllerConnect = (e: GamepadEvent) => {
    console.log(`[v0] Controle conectado: ${e.gamepad.id}`)
    detectControllers()
  }

  const handleControllerDisconnect = (e: GamepadEvent) => {
    console.log(`[v0] Controle desconectado: ${e.gamepad.id}`)
    detectControllers()
  }

  const handlePlay = () => {
    setIsPlaying(!isPlaying)

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        if (!isPlaying) {
          ctx.fillStyle = "#001122"
          ctx.fillRect(0, 0, 800, 600)
          ctx.fillStyle = "#00ff00"
          ctx.font = "20px Arial"
          ctx.textAlign = "center"
          ctx.fillText(`${game.title} - JOGANDO`, 400, 300)
          ctx.fillStyle = "#ffffff"
          ctx.font = "14px Arial"
          ctx.fillText("Use os controles ou teclado para jogar", 400, 340)
        } else {
          ctx.fillStyle = "rgba(0,0,0,0.7)"
          ctx.fillRect(0, 0, 800, 600)
          ctx.fillStyle = "#fff"
          ctx.font = "24px Arial"
          ctx.textAlign = "center"
          ctx.fillText("PAUSADO", 400, 300)
        }
      }
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    initializeEmulator()
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />

        <Card className="w-full max-w-md bg-black/80 border-2 border-yellow-500/30 backdrop-blur-xl shadow-2xl shadow-yellow-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Carregando {game.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="relative">
                <img
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  className="w-32 h-32 mx-auto rounded-lg mb-4 shadow-lg shadow-yellow-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg" />
              </div>
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold">
                <Crown className="w-3 h-3 mr-1" />
                {game.console}
              </Badge>
            </div>
            <Progress
              value={loadingProgress}
              className="w-full h-3 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-yellow-500 [&>div]:to-yellow-600"
            />
            <p className="text-center text-sm text-yellow-400 font-medium">Inicializando ROM... {loadingProgress}%</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Card className="w-full max-w-md bg-black/80 border-2 border-red-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-red-400">Erro ao Carregar Jogo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-500/30 bg-red-500/10">
              <AlertDescription className="text-red-300">{error}</AlertDescription>
            </Alert>
            <Button
              onClick={() => window.history.back()}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Biblioteca
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)] pointer-events-none" />

      {/* Header Premium */}
      <div className="bg-black/80 backdrop-blur-xl border-b border-yellow-500/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center space-x-3">
              <img
                src="/js-gaming-hub-logo.png"
                alt="J.S Gaming Hub"
                className="w-10 h-10 rounded-lg shadow-lg shadow-yellow-500/30"
              />
              <div>
                <h1 className="text-white font-bold text-lg">{game.title}</h1>
                <p className="text-yellow-400 text-sm font-medium">
                  {game.console} • {game.genre}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {connectedControllers.length > 0 && (
              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold">
                <Gamepad2 className="w-3 h-3 mr-1" />
                {connectedControllers.length} Controle(s)
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-yellow-400 hover:bg-yellow-500/10"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Área do Jogo Premium */}
      <div ref={gameContainerRef} className="flex-1 flex items-center justify-center p-6">
        <div className="relative">
          <div className="p-4 bg-black/50 backdrop-blur-sm rounded-2xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/10">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border-2 border-yellow-500/20 rounded-xl bg-black shadow-inner"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* Controles Premium */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black/80 backdrop-blur-xl rounded-2xl p-3 border border-yellow-500/30 shadow-lg shadow-yellow-500/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlay}
              className="text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300">
              <Volume2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Controles Virtuais Premium para Mobile */}
      <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-yellow-500/30 p-6">
        <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
          <div></div>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 font-bold"
          >
            ↑
          </Button>
          <div></div>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 font-bold"
          >
            Y
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 font-bold"
          >
            ←
          </Button>
          <div></div>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 font-bold"
          >
            →
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 font-bold"
          >
            X
          </Button>

          <div></div>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 font-bold"
          >
            ↓
          </Button>
          <div></div>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 text-xs font-bold"
          >
            A
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 text-xs font-bold"
          >
            SELECT
          </Button>
          <div></div>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 text-xs font-bold"
          >
            START
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-900/50 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 font-bold"
          >
            B
          </Button>
        </div>
      </div>
    </div>
  )
}
