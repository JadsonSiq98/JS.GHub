"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Server, Wifi, Users, HardDrive } from "lucide-react"

export function CloudServerStatus() {
  const [status, setStatus] = useState({
    online: true,
    latency: 45,
    activeUsers: 12,
    serverLoad: 23,
    uptime: "99.9%",
  })

  useEffect(() => {
    // Simular atualizações de status em tempo real
    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        latency: Math.floor(Math.random() * 50) + 20,
        activeUsers: Math.floor(Math.random() * 20) + 5,
        serverLoad: Math.floor(Math.random() * 40) + 10,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    if (status.latency < 50) return "bg-green-500"
    if (status.latency < 100) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getLoadColor = () => {
    if (status.serverLoad < 30) return "text-green-600"
    if (status.serverLoad < 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          <Badge variant="secondary" className="text-xs">
            <Server className="w-3 h-3 mr-1" />
            {status.latency}ms
          </Badge>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Status do Servidor</h3>
                <Badge className={status.online ? "bg-green-500" : "bg-red-500"}>
                  {status.online ? "Online" : "Offline"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Wifi className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                  <p className="text-sm font-medium">{status.latency}ms</p>
                  <p className="text-xs text-gray-600">Latência</p>
                </div>

                <div className="text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-green-500" />
                  <p className="text-sm font-medium">{status.activeUsers}</p>
                  <p className="text-xs text-gray-600">Usuários Online</p>
                </div>

                <div className="text-center">
                  <HardDrive className={`w-5 h-5 mx-auto mb-1 ${getLoadColor()}`} />
                  <p className={`text-sm font-medium ${getLoadColor()}`}>{status.serverLoad}%</p>
                  <p className="text-xs text-gray-600">Carga do Servidor</p>
                </div>

                <div className="text-center">
                  <Server className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                  <p className="text-sm font-medium">{status.uptime}</p>
                  <p className="text-xs text-gray-600">Uptime</p>
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">Servidor: São Paulo, Brasil 🇧🇷</div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
