"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GamePlayer } from "@/components/game-player"
import { DeviceCompatibility } from "@/components/device-compatibility"
import { InstallationGuide } from "@/components/installation-guide"
import { CloudServerStatus } from "@/components/cloud-server-status"
import {
  Search,
  Gamepad2,
  Monitor,
  Settings,
  User,
  LogOut,
  Play,
  Star,
  Download,
  Wifi,
  Bluetooth,
  Usb,
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
    image: "/placeholder-5gd0m.png",
    rom: "snes/super-mario-world.smc",
  },
  {
    id: 2,
    title: "The Legend of Zelda: A Link to the Past",
    console: "SNES",
    genre: "Aventura",
    rating: 4.8,
    image: "/placeholder-zmsj6.png",
    rom: "snes/zelda-alttp.smc",
  },
  {
    id: 3,
    title: "Super Metroid",
    console: "SNES",
    genre: "Aventura",
    rating: 4.9,
    image: "/placeholder-beiws.png",
    rom: "snes/super-metroid.smc",
  },
  {
    id: 4,
    title: "Chrono Trigger",
    console: "SNES",
    genre: "RPG",
    rating: 4.9,
    image: "/placeholder-2buyo.png",
    rom: "snes/chrono-trigger.smc",
  },
  {
    id: 5,
    title: "Final Fantasy VI",
    console: "SNES",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder-mou3w.png",
    rom: "snes/ff6.smc",
  },
  {
    id: 6,
    title: "Donkey Kong Country",
    console: "SNES",
    genre: "Plataforma",
    rating: 4.7,
    image: "/placeholder-4s062.png",
    rom: "snes/dkc.smc",
  },
  {
    id: 7,
    title: "Street Fighter II Turbo",
    console: "SNES",
    genre: "Luta",
    rating: 4.6,
    image: "/placeholder-ipr07.png",
    rom: "snes/sf2-turbo.smc",
  },
  {
    id: 8,
    title: "Super Mario Kart",
    console: "SNES",
    genre: "Corrida",
    rating: 4.5,
    image: "/placeholder-a1d14.png",
    rom: "snes/mario-kart.smc",
  },

  // N64 Games
  {
    id: 9,
    title: "Super Mario 64",
    console: "N64",
    genre: "Plataforma",
    rating: 4.9,
    image: "/placeholder-ca4mp.png",
    rom: "n64/mario64.z64",
  },
  {
    id: 10,
    title: "The Legend of Zelda: Ocarina of Time",
    console: "N64",
    genre: "Aventura",
    rating: 4.9,
    image: "/placeholder-c1jg9.png",
    rom: "n64/zelda-oot.z64",
  },
  {
    id: 11,
    title: "GoldenEye 007",
    console: "N64",
    genre: "FPS",
    rating: 4.7,
    image: "/placeholder-a98pj.png",
    rom: "n64/goldeneye.z64",
  },
  {
    id: 12,
    title: "Super Smash Bros.",
    console: "N64",
    genre: "Luta",
    rating: 4.8,
    image: "/placeholder-54e5h.png",
    rom: "n64/smash-bros.z64",
  },
  {
    id: 13,
    title: "Mario Kart 64",
    console: "N64",
    genre: "Corrida",
    rating: 4.6,
    image: "/placeholder-2l20m.png",
    rom: "n64/mario-kart-64.z64",
  },
  {
    id: 14,
    title: "Super Mario Party",
    console: "N64",
    genre: "Party",
    rating: 4.5,
    image: "/placeholder-s3bz0.png",
    rom: "n64/mario-party.z64",
  },

  // PlayStation 1 Games
  {
    id: 15,
    title: "Final Fantasy VII",
    console: "PS1",
    genre: "RPG",
    rating: 4.9,
    image: "/final-fantasy-vii-ps1-cover.png",
    rom: "ps1/ff7.bin",
  },
  {
    id: 16,
    title: "Metal Gear Solid",
    console: "PS1",
    genre: "Ação",
    rating: 4.8,
    image: "/placeholder-y41te.png",
    rom: "ps1/mgs.bin",
  },
  {
    id: 17,
    title: "Resident Evil 2",
    console: "PS1",
    genre: "Terror",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    rom: "ps1/re2.bin",
  },
  {
    id: 18,
    title: "Crash Bandicoot 3",
    console: "PS1",
    genre: "Plataforma",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    rom: "ps1/crash3.bin",
  },
  {
    id: 19,
    title: "Gran Turismo 2",
    console: "PS1",
    genre: "Corrida",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    rom: "ps1/gt2.bin",
  },
  {
    id: 20,
    title: "Tekken 3",
    console: "PS1",
    genre: "Luta",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    rom: "ps1/tekken3.bin",
  },

  // PlayStation 2 Games
  {
    id: 21,
    title: "Grand Theft Auto: San Andreas",
    console: "PS2",
    genre: "Ação",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    rom: "ps2/gta-sa.iso",
  },
  {
    id: 22,
    title: "God of War",
    console: "PS2",
    genre: "Ação",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    rom: "ps2/god-of-war.iso",
  },
  {
    id: 23,
    title: "Shadow of the Colossus",
    console: "PS2",
    genre: "Aventura",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    rom: "ps2/sotc.iso",
  },
  {
    id: 24,
    title: "Final Fantasy X",
    console: "PS2",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    rom: "ps2/ffx.iso",
  },
  {
    id: 25,
    title: "Guitar Hero II",
    console: "PS2",
    genre: "Música",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    rom: "ps2/gh2.iso",
  },

  // Xbox 360 Games
  {
    id: 26,
    title: "Halo 3",
    console: "Xbox 360",
    genre: "FPS",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    rom: "xbox360/halo3.iso",
  },
  {
    id: 27,
    title: "Gears of War",
    console: "Xbox 360",
    genre: "Ação",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    rom: "xbox360/gow.iso",
  },
  {
    id: 28,
    title: "Forza Motorsport 3",
    console: "Xbox 360",
    genre: "Corrida",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    rom: "xbox360/forza3.iso",
  },
  {
    id: 29,
    title: "Call of Duty: Modern Warfare 2",
    console: "Xbox 360",
    genre: "FPS",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    rom: "xbox360/cod-mw2.iso",
  },
  {
    id: 30,
    title: "Red Dead Redemption",
    console: "Xbox 360",
    genre: "Ação",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    rom: "xbox360/rdr.iso",
  },
]

const consoles = [
  { name: "SNES", count: 8, icon: "🎮" },
  { name: "N64", count: 6, icon: "🕹️" },
  { name: "PS1", count: 6, icon: "💿" },
  { name: "PS2", count: 5, icon: "📀" },
  { name: "Xbox 360", count: 5, icon: "🎯" },
]

export default function JSGamingHub() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [selectedGame, setSelectedGame] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConsole, setSelectedConsole] = useState("all")
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  // Sistema de usuários
  const users = [
    {
      email: "jadsonreserva98@gmail.com",
      password: "admin2024",
      name: "Jadson Silva",
      role: "admin",
      isOwner: true,
    },
    {
      email: "admin@jsgaming.com",
      password: "retro2024",
      name: "Admin",
      role: "admin",
    },
    {
      email: "gamer@jsgaming.com",
      password: "cloud123",
      name: "Gamer",
      role: "user",
    },
    {
      email: "player@jsgaming.com",
      password: "games456",
      name: "Player",
      role: "user",
    },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find((u) => u.email === loginForm.email && u.password === loginForm.password)

    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
      setIsLoginOpen(false)
      setLoginError("")
      setLoginForm({ email: "", password: "" })
    } else {
      setLoginError("Email ou senha incorretos")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setSelectedGame(null)
  }

  const filteredGames = featuredGames.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesConsole = selectedConsole === "all" || game.console === selectedConsole
    return matchesSearch && matchesConsole
  })

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">J.S Gaming Hub</CardTitle>
            <CardDescription>Servidor de Jogos Retrô - Acesse sua biblioteca de jogos clássicos</CardDescription>
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
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
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
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              {loginError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{loginError}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Entrar no Gaming Hub
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Credenciais de teste:</p>
              <div className="text-xs space-y-1">
                <p>
                  <strong>Admin:</strong> jadsonreserva98@gmail.com / admin2024
                </p>
                <p>
                  <strong>Usuário:</strong> gamer@jsgaming.com / cloud123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (selectedGame) {
    return <GamePlayer game={selectedGame} onBack={() => setSelectedGame(null)} user={currentUser} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">J.S Gaming Hub</h1>
              <p className="text-sm text-gray-300">Servidor de Jogos Retrô</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <CloudServerStatus />
            <div className="flex items-center space-x-2 text-white">
              <User className="w-4 h-4" />
              <span className="text-sm">{currentUser?.name}</span>
              {currentUser?.isOwner && (
                <Badge variant="secondary" className="text-xs">
                  Owner
                </Badge>
              )}
              {currentUser?.role === "admin" && !currentUser?.isOwner && (
                <Badge variant="outline" className="text-xs">
                  Admin
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="games">Jogos</TabsTrigger>
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            <TabsTrigger value="install">Instalação</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-6">
            {/* Busca e Filtros */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar jogos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedConsole}
                onChange={(e) => setSelectedConsole(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">Todos os Consoles</option>
                {consoles.map((console) => (
                  <option key={console.name} value={console.name}>
                    {console.name} ({console.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Estatísticas dos Consoles */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {consoles.map((console) => (
                <Card key={console.name} className="text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl mb-2">{console.icon}</div>
                    <h3 className="font-semibold">{console.name}</h3>
                    <p className="text-sm text-gray-600">{console.count} jogos</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Grid de Jogos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <Card key={game.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        onClick={() => setSelectedGame(game)}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Jogar
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm leading-tight">{game.title}</h3>
                      <Badge variant="secondary" className="text-xs ml-2">
                        {game.console}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{game.genre}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">{game.rating}</span>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => setSelectedGame(game)}>
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="devices">
            <DeviceCompatibility />
          </TabsContent>

          <TabsContent value="install">
            <InstallationGuide />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>Gerencie as configurações do seu gaming hub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Wifi className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <h3 className="font-semibold">Controles Wireless</h3>
                      <p className="text-sm text-gray-600">Conectados: 2</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Bluetooth className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="font-semibold">Bluetooth</h3>
                      <p className="text-sm text-gray-600">Ativo</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Usb className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <h3 className="font-semibold">USB</h3>
                      <p className="text-sm text-gray-600">3 portas ativas</p>
                    </CardContent>
                  </Card>
                </div>

                {currentUser?.role === "admin" && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Configurações de Administrador</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Settings className="w-4 h-4 mr-2" />
                        Gerenciar Usuários
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Adicionar ROMs
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Monitor className="w-4 h-4 mr-2" />
                        Configurar Servidor
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
