"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Smartphone, Monitor, Tv, Gamepad2, Bluetooth, Usb, Wifi } from "lucide-react"

export function DeviceCompatibility() {
  const devices = [
    {
      name: "iPhone/iPad",
      icon: <Smartphone className="w-6 h-6" />,
      status: "Compatível",
      features: ["Touch Controls", "Safari Browser", "PWA Support"],
      color: "bg-green-500",
    },
    {
      name: "Android",
      icon: <Smartphone className="w-6 h-6" />,
      status: "Compatível",
      features: ["Touch Controls", "Chrome Browser", "PWA Support"],
      color: "bg-green-500",
    },
    {
      name: "Notebooks/PC",
      icon: <Monitor className="w-6 h-6" />,
      status: "Totalmente Compatível",
      features: ["Keyboard Controls", "USB Gamepads", "Full Performance"],
      color: "bg-blue-500",
    },
    {
      name: "Smart TV Android",
      icon: <Tv className="w-6 h-6" />,
      status: "Compatível",
      features: ["Remote Control", "Bluetooth Gamepads", "Big Screen"],
      color: "bg-green-500",
    },
    {
      name: "Samsung Gaming Hub",
      icon: <Tv className="w-6 h-6" />,
      status: "Compatível",
      features: ["Gaming Mode", "Low Latency", "Controller Support"],
      color: "bg-purple-500",
    },
  ]

  const controllers = [
    {
      name: "Controles USB",
      icon: <Usb className="w-5 h-5" />,
      description: "Xbox, PlayStation, genéricos",
      status: "Plug & Play",
    },
    {
      name: "Controles Bluetooth",
      icon: <Bluetooth className="w-5 h-5" />,
      description: "PS4, PS5, Xbox One/Series",
      status: "Pareamento automático",
    },
    {
      name: "Controles Wireless",
      icon: <Wifi className="w-5 h-5" />,
      description: "Receptores 2.4GHz",
      status: "Detecção automática",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Monitor className="w-5 h-5 mr-2" />
            Compatibilidade de Dispositivos
          </CardTitle>
          <CardDescription>O J.S Gaming Hub funciona em diversos dispositivos e plataformas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {device.icon}
                      <h3 className="font-semibold">{device.name}</h3>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>

                  <Badge className={`${device.color} text-white mb-3`}>{device.status}</Badge>

                  <ul className="space-y-1">
                    {device.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gamepad2 className="w-5 h-5 mr-2" />
            Suporte a Controles
          </CardTitle>
          <CardDescription>Conecte seus controles favoritos via USB, Bluetooth ou Wireless</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {controllers.map((controller, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      {controller.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{controller.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{controller.description}</p>
                  <Badge variant="outline">{controller.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requisitos do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Mínimo</h3>
              <ul className="space-y-2 text-sm">
                <li>• Navegador moderno (Chrome, Firefox, Safari)</li>
                <li>• Conexão com internet</li>
                <li>• 2GB RAM disponível</li>
                <li>• Resolução mínima: 800x600</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Recomendado</h3>
              <ul className="space-y-2 text-sm">
                <li>• Chrome/Edge mais recente</li>
                <li>• Conexão banda larga</li>
                <li>• 4GB RAM ou mais</li>
                <li>• Resolução Full HD (1920x1080)</li>
                <li>• Controle USB/Bluetooth</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
