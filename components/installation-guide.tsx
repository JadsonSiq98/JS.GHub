"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Smartphone, Monitor, Tv, Share, Plus, CheckCircle } from "lucide-react"

export function InstallationGuide() {
  const handleInstallPWA = () => {
    // Lógica para instalar PWA
    if ("serviceWorker" in navigator) {
      console.log("[v0] Instalando PWA...")
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "J.S Gaming Hub",
        text: "Servidor de jogos retrô online",
        url: window.location.href,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Guia de Instalação
          </CardTitle>
          <CardDescription>Instale o J.S Gaming Hub em seus dispositivos para acesso rápido</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="mobile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
          <TabsTrigger value="tv">Smart TV</TabsTrigger>
          <TabsTrigger value="pwa">PWA</TabsTrigger>
        </TabsList>

        <TabsContent value="mobile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Instalação Mobile (iOS/Android)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">📱 iPhone/iPad</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        1
                      </span>
                      Abra o Safari e acesse o gaming hub
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        2
                      </span>
                      Toque no botão de compartilhar (📤)
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        3
                      </span>
                      Selecione "Adicionar à Tela Inicial"
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        4
                      </span>
                      Confirme a instalação
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center">🤖 Android</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        1
                      </span>
                      Abra o Chrome e acesse o gaming hub
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        2
                      </span>
                      Toque nos 3 pontos (⋮) no menu
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        3
                      </span>
                      Selecione "Adicionar à tela inicial"
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        4
                      </span>
                      Confirme a instalação
                    </li>
                  </ol>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleInstallPWA} className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Instalar App
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desktop" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="w-5 h-5 mr-2" />
                Instalação Desktop
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🖥️ Windows/Mac/Linux</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      Abra Chrome, Edge ou Firefox
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      Acesse o gaming hub
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      Clique no ícone de instalação na barra de endereços
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      Confirme a instalação como app
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">⌨️ Atalhos de Teclado</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Buscar jogos:</span>
                      <Badge variant="outline">Ctrl + F</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Tela cheia:</span>
                      <Badge variant="outline">F11</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Voltar:</span>
                      <Badge variant="outline">Esc</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Pausar jogo:</span>
                      <Badge variant="outline">Space</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tv" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tv className="w-5 h-5 mr-2" />
                Smart TV & Gaming Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">📺 Smart TV Android</h3>
                  <ol className="space-y-2 text-sm">
                    <li>• Abra o navegador da TV</li>
                    <li>• Acesse o gaming hub</li>
                    <li>• Use o controle remoto para navegar</li>
                    <li>• Conecte gamepad Bluetooth para melhor experiência</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">🎮 Samsung Gaming Hub</h3>
                  <ol className="space-y-2 text-sm">
                    <li>• Acesse o Gaming Hub na TV</li>
                    <li>• Abra o navegador web</li>
                    <li>• Navegue até o gaming hub</li>
                    <li>• Ative o modo gaming para menor latência</li>
                  </ol>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Dicas para TV</h4>
                <ul className="text-sm space-y-1">
                  <li>• Use controles Bluetooth para melhor jogabilidade</li>
                  <li>• Ative o modo jogo da TV para reduzir input lag</li>
                  <li>• Conecte via cabo ethernet para conexão mais estável</li>
                  <li>• Ajuste o zoom do navegador se necessário</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pwa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progressive Web App (PWA)</CardTitle>
              <CardDescription>Instale como aplicativo nativo para melhor performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Download className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-semibold">Instalação Offline</h3>
                    <p className="text-sm text-gray-600">Funciona sem internet após instalação</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Monitor className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold">App Nativo</h3>
                    <p className="text-sm text-gray-600">Comporta-se como app instalado</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h3 className="font-semibold">Auto-Update</h3>
                    <p className="text-sm text-gray-600">Atualizações automáticas</p>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={handleInstallPWA} className="w-full" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Instalar J.S Gaming Hub
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
