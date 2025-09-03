"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GamePlayer } from "@/components/game-player"
import { DeviceCompatibility } from "@/components/device-compatibility"
import { InstallationGuide } from "@/components/installation-guide"
import { CloudServerStatus } from "@/components/cloud-server-status"
import {
  Gamepad2,
  Monitor,
  Play,
  Settings,
  Users,
  Star,
  Search,
  Grid3X3,
  List,
  LogOut,
  Crown,
  Trophy,
  Zap,
  Shield,
} from "lucide-react"

// Dados dos jogos organizados por console
const featuredGames = [
  // SNES Games
  {
    id: 1,
    title: "Super Mario World",
    console: "SNES",
    genre: "Plataforma",
    rating: 4.9,
    players: "1-2",
    image: "/placeholder.svg?height=200&width=300&text=Super+Mario+World",
  },
  {
    id: 2,
    title: "The Legend of Zelda: A Link to the Past",
    console: "SNES",
    genre: "Aventura",
    rating: 4.8,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Zelda+ALTTP",
  },
  {
    id: 3,
    title: "Super Metroid",
    console: "SNES",
    genre: "Ação",
    rating: 4.9,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Super+Metroid",
  },
  {
    id: 4,
    title: "Chrono Trigger",
    console: "SNES",
    genre: "RPG",
    rating: 4.9,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Chrono+Trigger",
  },
  {
    id: 5,
    title: "Final Fantasy VI",
    console: "SNES",
    genre: "RPG",
    rating: 4.8,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Final+Fantasy+VI",
  },
  {
    id: 6,
    title: "Donkey Kong Country",
    console: "SNES",
    genre: "Plataforma",
    rating: 4.7,
    players: "1-2",
    image: "/placeholder.svg?height=200&width=300&text=Donkey+Kong+Country",
  },
  {
    id: 7,
    title: "Street Fighter II",
    console: "SNES",
    genre: "Luta",
    rating: 4.6,
    players: "1-2",
    image: "/placeholder.svg?height=200&width=300&text=Street+Fighter+II",
  },
  {
    id: 8,
    title: "Super Mario Kart",
    console: "SNES",
    genre: "Corrida",
    rating: 4.5,
    players: "1-2",
    image: "/placeholder.svg?height=200&width=300&text=Super+Mario+Kart",
  },

  // N64 Games
  {
    id: 9,
    title: "Super Mario 64",
    console: "N64",
    genre: "Plataforma",
    rating: 4.9,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Super+Mario+64",
  },
  {
    id: 10,
    title: "The Legend of Zelda: Ocarina of Time",
    console: "N64",
    genre: "Aventura",
    rating: 4.9,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Zelda+OOT",
  },
  {
    id: 11,
    title: "GoldenEye 007",
    console: "N64",
    genre: "FPS",
    rating: 4.7,
    players: "1-4",
    image: "/placeholder.svg?height=200&width=300&text=GoldenEye+007",
  },
  {
    id: 12,
    title: "Super Smash Bros.",
    console: "N64",
    genre: "Luta",
    rating: 4.6,
    players: "1-4",
    image: "/placeholder.svg?height=200&width=300&text=Super+Smash+Bros",
  },
  {
    id: 13,
    title: "Mario Kart 64",
    console: "N64",
    genre: "Corrida",
    rating: 4.7,
    players: "1-4",
    image: "/placeholder.svg?height=200&width=300&text=Mario+Kart+64",
  },
  {
    id: 14,
    title: "Super Mario Party",
    console: "N64",
    genre: "Party",
    rating: 4.5,
    players: "1-4",
    image: "/placeholder.svg?height=200&width=300&text=Mario+Party",
  },

  // PlayStation 1 Games
  {
    id: 15,
    title: "Final Fantasy VII",
    console: "PS1",
    genre: "RPG",
    rating: 4.9,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Final+Fantasy+VII",
  },
  {
    id: 16,
    title: "Metal Gear Solid",
    console: "PS1",
    genre: "Ação",
    rating: 4.8,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Metal+Gear+Solid",
  },
  {
    id: 17,
    title: "Resident Evil 2",
    console: "PS1",
    genre: "Terror",
    rating: 4.7,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Resident+Evil+2",
  },
  {
    id: 18,
    title: "Crash Bandicoot 3",
    console: "PS1",
    genre: "Plataforma",
    rating: 4.6,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Crash+Bandicoot+3",
  },
  {
    id: 19,
    title: "Gran Turismo 2",
    console: "PS1",
    genre: "Corrida",
    rating: 4.5,
    players: "1-2",
    image: "/placeholder.svg?height=200&width=300&text=Gran+Turismo+2",
  },
  {
    id: 20,
    title: "Tekken 3",
    console: "PS1",
    genre: "Luta",
    rating: 4.7,
    players: "1-2",
    image: "/placeholder.svg?height=200&width=300&text=Tekken+3",
  },

  // PlayStation 2 Games
  {
    id: 21,
    title: "Grand Theft Auto: San Andreas",
    console: "PS2",
    genre: "Ação",
    rating: 4.8,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=GTA+San+Andreas",
  },
  {
    id: 22,
    title: "God of War",
    console: "PS2",
    genre: "Ação",
    rating: 4.7,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=God+of+War",
  },
  {
    id: 23,
    title: "Shadow of the Colossus",
    console: "PS2",
    genre: "Aventura",
    rating: 4.8,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Shadow+Colossus",
  },
  {
    id: 24,
    title: "Final Fantasy X",
    console: "PS2",
    genre: "RPG",
    rating: 4.7,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Final+Fantasy+X",
  },
  {
    id: 25,
    title: "Guitar Hero II",
    console: "PS2",
    genre: "Música",
    rating: 4.6,
    players: "1-2",
    image: "/placeholder.svg?height=200&width=300&text=Guitar+Hero+II",
  },

  // Xbox 360 Games
  {
    id: 26,
    title: "Halo 3",
    console: "Xbox 360",
    genre: "FPS",
    rating: 4.8,
    players: "1-4",
    image: "/placeholder.svg?height=200&width=300&text=Halo+3",
  },
  {
    id: 27,
    title: "Gears of War",
    console: "Xbox 360",
    genre: "TPS",
    rating: 4.7,
    players: "1-2",
    image: "/placeholder.svg?height=200&width=300&text=Gears+of+War",
  },
  {
    id: 28,
    title: "Mass Effect",
    console: "Xbox 360",
    genre: "RPG",
    rating: 4.6,
    players: "1",
    image: "/placeholder.svg?height=200&width=300&text=Mass+Effect",
  },
  {
    id: 29,
    title: "Forza Motorsport 3",
    console: "Xbox 360",
    genre: "Corrida",
    rating: 4.5,
    players: "1-8",
    image: "/placeholder.svg?height=200&width=300&text=Forza+3",
  },
  {
    id: 30,
    title: "Call of Duty: Modern Warfare 2",
    console: "Xbox 360",
    genre: "FPS",
    rating: 4.7,
    players: "1-18",
    image: "/placeholder.svg?height=200&width=300&text=COD+MW2",
  },
]

const consoles = [
  { name: "SNES", count: 8, icon: "🎮", color: "bg-purple-500" },
  { name: "N64", count: 6, icon: "🕹️", color: "bg-blue-500" },
  { name: "PS1", count: 6, icon: "🎯", color: "bg-gray-500" },
  { name: "PS2", count: 5, icon: "🎪", color: "bg-black" },
  { name: "Xbox 360", count: 5, icon: "🎲", color: "bg-green-500" },
]

export default function JSGamingHub() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [selectedGame, setSelectedGame] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConsole, setSelectedConsole] = useState("Todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Sistema de usuários
  const users = [
    {
      email: "jadsonreserva98@gmail.com",
      password: "admin2024",
      name: "Jadson Silva",
      role: "admin",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
    },
    {
      email: "admin@jsgaming.com",
      password: "retro2024",
      name: "Admin",
      role: "admin",
      avatar: "/placeholder.svg?height=40&width=40&text=AD",
    },
    {
      email: "gamer@jsgaming.com",
      password: "cloud123",
      name: "Gamer Pro",
      role: "user",
      avatar: "/placeholder.svg?height=40&width=40&text=GP",
    },
  ]

  // Filtrar jogos
  const filteredGames = featuredGames.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesConsole = selectedConsole === "Todos" || game.console === selectedConsole
    return matchesSearch && matchesConsole
  })

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = users.find((u) => u.email === loginForm.email && u.password === loginForm.password)

    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
      setLoginForm({ email: "", password: "" })
    } else {
      setLoginError("Email ou senha incorretos")
    }

    setIsLoading(false)
  }

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setSelectedGame(null)
  }

  // Tela de Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">J.S Gaming Hub</CardTitle>
            <CardDescription>Servidor de Jogos Retrô - Acesse sua conta para jogar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              {loginError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{loginError}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Contas de Teste:</p>
              <div className="text-xs space-y-1">
                <p>
                  <strong>Admin:</strong> jadsonreserva98@gmail.com / admin2024
                </p>
                <p>
                  <strong>Gamer:</strong> gamer@jsgaming.com / cloud123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Interface Principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">J.S Gaming Hub</h1>
                <p className="text-sm text-gray-300">Servidor de Jogos Retrô</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <CloudServerStatus />
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser?.avatar || "/placeholder.svg"}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{currentUser?.name}</p>
                  <div className="flex items-center space-x-1">
                    {currentUser?.role === "admin" && <Crown className="w-3 h-3 text-yellow-400" />}
                    <p className="text-xs text-gray-300 capitalize">{currentUser?.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Game Player Modal */}
      {selectedGame && <GamePlayer game={selectedGame} onClose={() => setSelectedGame(null)} />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20">
            <TabsTrigger value="games">Jogos</TabsTrigger>
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            <TabsTrigger value="install">Instalação</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-black/20 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-300">Total de Jogos</p>
                      <p className="text-2xl font-bold text-white">{featuredGames.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Gamepad2 className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-300">Consoles</p>
                      <p className="text-2xl font-bold text-white">{consoles.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-300">Usuários Online</p>
                      <p className="text-2xl font-bold text-white">1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-300">Status</p>
                      <p className="text-lg font-bold text-green-400">Online</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Consoles */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Consoles Disponíveis</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {consoles.map((console) => (
                  <Card
                    key={console.name}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedConsole === console.name
                        ? "ring-2 ring-purple-500 bg-purple-500/20"
                        : "bg-black/20 hover:bg-black/30"
                    } border-gray-700`}
                    onClick={() => setSelectedConsole(selectedConsole === console.name ? "Todos" : console.name)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{console.icon}</div>
                      <h3 className="font-semibold text-white">{console.name}</h3>
                      <p className="text-sm text-gray-300">{console.count} jogos</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2 flex-1">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar jogos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-black/20 border-gray-700 text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Games Grid */}
            <div
              className={`grid gap-4 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredGames.map((game) => (
                <Card
                  key={game.id}
                  className="bg-black/20 border-gray-700 hover:bg-black/30 transition-all cursor-pointer group"
                  onClick={() => setSelectedGame(game)}
                >
                  <CardContent className="p-4">
                    <div className={`${viewMode === "list" ? "flex items-center space-x-4" : "space-y-3"}`}>
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.title}
                        className={`${
                          viewMode === "list" ? "w-16 h-16" : "w-full h-32"
                        } object-cover rounded-lg group-hover:scale-105 transition-transform`}
                      />

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {game.title}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-300">{game.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {game.console}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {game.genre}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">{game.players} jogadores</span>
                          <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-4 h-4 mr-1" />
                            Jogar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Nenhum jogo encontrado</h3>
                <p className="text-gray-500">Tente ajustar os filtros ou termo de busca</p>
              </div>
            )}
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices">
            <DeviceCompatibility />
          </TabsContent>

          {/* Installation Tab */}
          <TabsContent value="install">
            <InstallationGuide />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Configurações do Sistema</CardTitle>
                <CardDescription>Gerencie as configurações do servidor de jogos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Qualidade de Vídeo</Label>
                    <select className="w-full p-2 rounded bg-black/20 border border-gray-700 text-white">
                      <option>Alta (1080p)</option>
                      <option>Média (720p)</option>
                      <option>Baixa (480p)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Qualidade de Áudio</Label>
                    <select className="w-full p-2 rounded bg-black/20 border border-gray-700 text-white">
                      <option>Alta</option>
                      <option>Média</option>
                      <option>Baixa</option>
                    </select>
                  </div>
                </div>

                {currentUser?.role === "admin" && (
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Configurações de Administrador</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Users className="w-4 h-4 mr-2" />
                        Gerenciar Usuários
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Settings className="w-4 h-4 mr-2" />
                        Configurações do Servidor
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Shield className="w-4 h-4 mr-2" />
                        Segurança
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Monitor className="w-4 h-4 mr-2" />
                        Monitoramento
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
