"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Play, Pause, RotateCcw, Settings, Gamepad2, Volume2, Maximize, Minimize } from "lucide-react"

interface GamePlayerProps {
  game: any
  onBack: () => void
  user: any
}

export function GamePlayer({ game, onBack, user }: GamePlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [connectedControllers, setConnectedControllers] = useState<Gamepad[]>([])
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Simular carregamento da ROM
    const loadGame = async () => {
      setIsLoading(true)
      setError("")

      try {
        // Simular progresso de carregamento
        for (let i = 0; i <= 100; i += 10) {
          setLoadingProgress(i)
          await new Promise((resolve) => setTimeout(resolve, 200))
        }

        // Inicializar emulador (simulado)
        await initializeEmulator()
        setIsLoading(false)
      } catch (err) {
        setError("Erro ao carregar o jogo. Verifique se a ROM está disponível.")
        setIsLoading(false)
      }
    }

    loadGame()
    detectControllers()

    // Listener para controles
    window.addEventListener("gamepadconnected", handleControllerConnect)
    window.addEventListener("gamepaddisconnected", handleControllerDisconnect)

    return () => {
      window.removeEventListener("gamepadconnected", handleControllerConnect)
      window.removeEventListener("gamepaddisconnected", handleControllerDisconnect)
    }
  }, [game])

  const initializeEmulator = async () => {
    // Simulação de inicialização do emulador
    console.log(`[v0] Inicializando emulador para ${game.console}`)
    console.log(`[v0] Carregando ROM: ${game.rom}`)

    // Aqui seria a integração real com EmulatorJS ou RetroArch
    // Por enquanto, simulamos com um canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        // Desenhar tela inicial do jogo (simulado)
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
          // Simular jogo rodando
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
          // Pausar
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Carregando {game.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <img
                src={game.image || "/placeholder.svg"}
                alt={game.title}
                className="w-32 h-32 mx-auto rounded-lg mb-4"
              />
              <Badge>{game.console}</Badge>
            </div>
            <Progress value={loadingProgress} className="w-full" />
            <p className="text-center text-sm text-gray-600">Carregando ROM... {loadingProgress}%</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Erro ao Carregar Jogo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
            <Button onClick={onBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Biblioteca
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header do Player */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-white font-semibold">{game.title}</h1>
              <p className="text-gray-400 text-sm">
                {game.console} • {game.genre}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {connectedControllers.length > 0 && (
              <Badge variant="secondary" className="bg-green-600">
                <Gamepad2 className="w-3 h-3 mr-1" />
                {connectedControllers.length} controle(s)
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Área do Jogo */}
      <div ref={gameContainerRef} className="flex-1 flex items-center justify-center p-4">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border border-gray-600 rounded-lg bg-black"
            style={{ maxWidth: "100%", height: "auto" }}
          />

          {/* Controles de Jogo */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/70 backdrop-blur-sm rounded-lg p-2">
            <Button variant="ghost" size="sm" onClick={handlePlay} className="text-white hover:bg-white/20">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-white hover:bg-white/20">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Controles Virtuais para Mobile */}
      <div className="md:hidden bg-gray-900 p-4">
        <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
          <div></div>
          <Button variant="outline" size="sm">
            ↑
          </Button>
          <div></div>
          <Button variant="outline" size="sm">
            Y
          </Button>

          <Button variant="outline" size="sm">
            ←
          </Button>
          <div></div>
          <Button variant="outline" size="sm">
            →
          </Button>
          <Button variant="outline" size="sm">
            X
          </Button>

          <div></div>
          <Button variant="outline" size="sm">
            ↓
          </Button>
          <div></div>
          <Button variant="outline" size="sm">
            A
          </Button>

          <Button variant="outline" size="sm">
            SELECT
          </Button>
          <div></div>
          <Button variant="outline" size="sm">
            START
          </Button>
          <Button variant="outline" size="sm">
            B
          </Button>
        </div>
      </div>
    </div>
  )
}
