"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, Play, Users, Gamepad2, Trophy, Crown, Zap } from "lucide-react"
import GamePlayer from "@/components/game-player"
import DeviceCompatibility from "@/components/device-compatibility"
import InstallationGuide from "@/components/installation-guide"
import CloudServerStatus from "@/components/cloud-server-status"

const featuredGames = [
  // SNES Games (20 jogos)
  {
    id: 1,
    title: "ActRaiser",
    console: "SNES",
    genre: "Ação/Simulação",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=ActRaiser",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/ActRaiser%20%28USA%29.zip",
  },
  {
    id: 2,
    title: "Chrono Trigger",
    console: "SNES",
    genre: "RPG",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=Chrono+Trigger",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Chrono%20Trigger%20%28USA%29.zip",
  },
  {
    id: 3,
    title: "Contra III: The Alien Wars",
    console: "SNES",
    genre: "Ação",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Contra+III",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Contra%20III%20-%20The%20Alien%20Wars%20%28USA%29.zip",
  },
  {
    id: 4,
    title: "Donkey Kong Country",
    console: "SNES",
    genre: "Plataforma",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=DK+Country",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Donkey%20Kong%20Country%20%28USA%29%20%28Rev%201%29.zip",
  },
  {
    id: 5,
    title: "Donkey Kong Country 2",
    console: "SNES",
    genre: "Plataforma",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=DK+Country+2",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Donkey%20Kong%20Country%202%20-%20Diddy%27s%20Kong%20Quest%20%28USA%29%20%28Rev%201%29.zip",
  },
  {
    id: 6,
    title: "Donkey Kong Country 3",
    console: "SNES",
    genre: "Plataforma",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=DK+Country+3",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Donkey%20Kong%20Country%203%20-%20Dixie%20Kong%27s%20Double%20Trouble%21%20%28USA%29.zip",
  },
  {
    id: 7,
    title: "EarthBound",
    console: "SNES",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=EarthBound",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/EarthBound%20%28USA%29.zip",
  },
  {
    id: 8,
    title: "Final Fantasy III (VI)",
    console: "SNES",
    genre: "RPG",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=FF+VI",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Final%20Fantasy%20III%20%28USA%29.zip",
  },
  {
    id: 9,
    title: "F-Zero",
    console: "SNES",
    genre: "Corrida",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=F-Zero",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/F-Zero%20%28USA%29.zip",
  },
  {
    id: 10,
    title: "Kirby Super Star",
    console: "SNES",
    genre: "Plataforma",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Kirby+Super+Star",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Kirby%20Super%20Star%20%28USA%29.zip",
  },
  {
    id: 11,
    title: "Mega Man X",
    console: "SNES",
    genre: "Ação/Plataforma",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Mega+Man+X",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Mega%20Man%20X%20%28USA%29.zip",
  },
  {
    id: 12,
    title: "Mortal Kombat",
    console: "SNES",
    genre: "Luta",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300&text=Mortal+Kombat",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Mortal%20Kombat%20%28USA%29.zip",
  },
  {
    id: 13,
    title: "Mortal Kombat II",
    console: "SNES",
    genre: "Luta",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=MK+II",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Mortal%20Kombat%20II%20%28USA%29.zip",
  },
  {
    id: 14,
    title: "Secret of Mana",
    console: "SNES",
    genre: "RPG",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Secret+of+Mana",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Secret%20of%20Mana%20%28USA%29.zip",
  },
  {
    id: 15,
    title: "Star Fox",
    console: "SNES",
    genre: "Ação/Voo",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Star+Fox",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Star%20Fox%20%28USA%29%20%28Rev%202%29.zip",
  },
  {
    id: 16,
    title: "Street Fighter II Turbo",
    console: "SNES",
    genre: "Luta",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=SF+II+Turbo",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Street%20Fighter%20II%20Turbo%20%28USA%29.zip",
  },
  {
    id: 17,
    title: "Super Castlevania IV",
    console: "SNES",
    genre: "Ação/Plataforma",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Castlevania+IV",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Super%20Castlevania%20IV%20%28USA%29.zip",
  },
  {
    id: 18,
    title: "Super Mario Kart",
    console: "SNES",
    genre: "Corrida",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Mario+Kart",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Super%20Mario%20Kart%20%28USA%29.zip",
  },
  {
    id: 19,
    title: "Super Mario RPG",
    console: "SNES",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Mario+RPG",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Super%20Mario%20RPG%20-%20Legend%20of%20the%20Seven%20Stars%20%28USA%29.zip",
  },
  {
    id: 20,
    title: "Super Mario World",
    console: "SNES",
    genre: "Plataforma",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=Mario+World",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Super%20Mario%20World%20%28USA%29.zip",
  },
  {
    id: 21,
    title: "Super Metroid",
    console: "SNES",
    genre: "Aventura/Ação",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=Super+Metroid",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Super%20Metroid%20%28USA%2C%20Europe%29.zip",
  },
  {
    id: 22,
    title: "The Legend of Zelda: A Link to the Past",
    console: "SNES",
    genre: "Aventura",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=Zelda+ALTTP",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Legend%20of%20Zelda%2C%20The%20-%20A%20Link%20to%20the%20Past%20%28USA%29.zip",
  },
  {
    id: 23,
    title: "Yoshi's Island",
    console: "SNES",
    genre: "Plataforma",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Yoshi+Island",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Super%20Mario%20World%202%20-%20Yoshi%27s%20Island%20%28USA%29.zip",
  },

  // N64 Games (19 jogos)
  {
    id: 24,
    title: "1080° Snowboarding",
    console: "N64",
    genre: "Esporte",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300&text=1080+Snowboarding",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/1080%20Snowboarding%20%28USA%29.zip",
  },
  {
    id: 25,
    title: "Banjo-Kazooie",
    console: "N64",
    genre: "Plataforma",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Banjo+Kazooie",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Banjo-Kazooie%20%28USA%29.zip",
  },
  {
    id: 26,
    title: "Banjo-Tooie",
    console: "N64",
    genre: "Plataforma",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Banjo+Tooie",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Banjo-Tooie%20%28USA%29.zip",
  },
  {
    id: 27,
    title: "Conker's Bad Fur Day",
    console: "N64",
    genre: "Plataforma",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Conker",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Conker%27s%20Bad%20Fur%20Day%20%28USA%29.zip",
  },
  {
    id: 28,
    title: "Donkey Kong 64",
    console: "N64",
    genre: "Plataforma",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=DK+64",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Donkey%20Kong%2064%20%28USA%29.zip",
  },
  {
    id: 29,
    title: "F-Zero X",
    console: "N64",
    genre: "Corrida",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=F-Zero+X",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/F-Zero%20X%20%28USA%29.zip",
  },
  {
    id: 30,
    title: "GoldenEye 007",
    console: "N64",
    genre: "FPS",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=GoldenEye",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/GoldenEye%20007%20%28USA%29.zip",
  },
  {
    id: 31,
    title: "Mario Kart 64",
    console: "N64",
    genre: "Corrida",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Mario+Kart+64",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Mario%20Kart%2064%20%28USA%29.zip",
  },
  {
    id: 32,
    title: "Mario Party",
    console: "N64",
    genre: "Party",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Mario+Party",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Mario%20Party%20%28USA%29.zip",
  },
  {
    id: 33,
    title: "Mario Party 2",
    console: "N64",
    genre: "Party",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Mario+Party+2",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Mario%20Party%202%20%28USA%29.zip",
  },
  {
    id: 34,
    title: "Mario Party 3",
    console: "N64",
    genre: "Party",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Mario+Party+3",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Mario%20Party%203%20%28USA%29.zip",
  },
  {
    id: 35,
    title: "Mario Tennis",
    console: "N64",
    genre: "Esporte",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300&text=Mario+Tennis",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Mario%20Tennis%20%28USA%29.zip",
  },
  {
    id: 36,
    title: "Paper Mario",
    console: "N64",
    genre: "RPG",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Paper+Mario",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Paper%20Mario%20%28USA%29.zip",
  },
  {
    id: 37,
    title: "Perfect Dark",
    console: "N64",
    genre: "FPS",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Perfect+Dark",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Perfect%20Dark%20%28USA%29%20%28Rev%201%29.zip",
  },
  {
    id: 38,
    title: "Pokémon Snap",
    console: "N64",
    genre: "Aventura",
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=300&text=Pokemon+Snap",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Pokemon%20Snap%20%28USA%29.zip",
  },
  {
    id: 39,
    title: "Pokémon Stadium",
    console: "N64",
    genre: "Luta",
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=300&text=Pokemon+Stadium",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Pokemon%20Stadium%20%28USA%29.zip",
  },
  {
    id: 40,
    title: "Star Fox 64",
    console: "N64",
    genre: "Ação/Voo",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Star+Fox+64",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Star%20Fox%2064%20%28USA%29.zip",
  },
  {
    id: 41,
    title: "Super Mario 64",
    console: "N64",
    genre: "Plataforma",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=Mario+64",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Super%20Mario%2064%20%28USA%29.zip",
  },
  {
    id: 42,
    title: "Super Smash Bros.",
    console: "N64",
    genre: "Luta",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Smash+Bros",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Super%20Smash%20Bros.%20%28USA%29.zip",
  },
  {
    id: 43,
    title: "The Legend of Zelda: Ocarina of Time",
    console: "N64",
    genre: "Aventura",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=Zelda+OOT",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Legend%20of%20Zelda%2C%20The%20-%20Ocarina%20of%20Time%20%28USA%29%20%28Rev%202%29.zip",
  },
  {
    id: 44,
    title: "The Legend of Zelda: Majora's Mask",
    console: "N64",
    genre: "Aventura",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Zelda+MM",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Legend%20of%20Zelda%2C%20The%20-%20Majora%27s%20Mask%20%28USA%29.zip",
  },
  {
    id: 45,
    title: "Turok: Dinosaur Hunter",
    console: "N64",
    genre: "FPS",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300&text=Turok",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Turok%20-%20Dinosaur%20Hunter%20%28USA%29%20%28Rev%201%29.zip",
  },
  {
    id: 46,
    title: "Wave Race 64",
    console: "N64",
    genre: "Corrida",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Wave+Race",
    rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Wave%20Race%2064%20%28USA%29.zip",
  },

  // PlayStation 1 Games (22 jogos)
  {
    id: 47,
    title: "Breath of Fire III",
    console: "PS1",
    genre: "RPG",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=BOF+III",
    rom: "https://archive.org/download/chd_psx/Breath%20of%20Fire%20III%20%28USA%29.chd",
  },
  {
    id: 48,
    title: "Castlevania: Symphony of the Night",
    console: "PS1",
    genre: "Ação/RPG",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=Castlevania+SOTN",
    rom: "https://archive.org/download/chd_psx/Castlevania%20-%20Symphony%20of%20the%20Night%20%28USA%29.chd",
  },
  {
    id: 49,
    title: "Chrono Cross",
    console: "PS1",
    genre: "RPG",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Chrono+Cross",
    rom: "https://archive.org/download/chd_psx/Chrono%20Cross%20%28USA%29.chd",
  },
  {
    id: 50,
    title: "Crash Bandicoot 2",
    console: "PS1",
    genre: "Plataforma",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Crash+2",
    rom: "https://archive.org/download/chd_psx/Crash%20Bandicoot%202%20-%20Cortex%20Strikes%20Back%20%28USA%29.chd",
  },
  {
    id: 51,
    title: "Final Fantasy VII",
    console: "PS1",
    genre: "RPG",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=FF+VII",
    rom: "https://archive.org/download/chd_psx/Final%20Fantasy%20VII%20%28USA%29%20%28Disc%201%29.chd",
  },
  {
    id: 52,
    title: "Final Fantasy IX",
    console: "PS1",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=FF+IX",
    rom: "https://archive.org/download/chd_psx/Final%20Fantasy%20IX%20%28USA%29%20%28Disc%201%29.chd",
  },
  {
    id: 53,
    title: "Final Fantasy Tactics",
    console: "PS1",
    genre: "Estratégia/RPG",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=FF+Tactics",
    rom: "https://archive.org/download/chd_psx/Final%20Fantasy%20Tactics%20%28USA%29.chd",
  },
  {
    id: 54,
    title: "Gran Turismo",
    console: "PS1",
    genre: "Corrida",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Gran+Turismo",
    rom: "https://archive.org/download/chd_psx/Gran%20Turismo%20%28USA%29%20%28v1.2%29.chd",
  },
  {
    id: 55,
    title: "Gran Turismo 2",
    console: "PS1",
    genre: "Corrida",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=GT+2",
    rom: "https://archive.org/download/chd_psx/Gran%20Turismo%202%20%28USA%29%20%28Arcade%20Mode%29.chd",
  },
  {
    id: 56,
    title: "Legend of Mana",
    console: "PS1",
    genre: "RPG",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Legend+of+Mana",
    rom: "https://archive.org/download/chd_psx/Legend%20of%20Mana%20%28USA%29.chd",
  },
  {
    id: 57,
    title: "Legacy of Kain: Soul Reaver",
    console: "PS1",
    genre: "Ação/Aventura",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Soul+Reaver",
    rom: "https://archive.org/download/chd_psx/Legacy%20of%20Kain%20-%20Soul%20Reaver%20%28USA%29.chd",
  },
  {
    id: 58,
    title: "MediEvil",
    console: "PS1",
    genre: "Ação/Aventura",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300&text=MediEvil",
    rom: "https://archive.org/download/chd_psx/MediEvil%20%28USA%29.chd",
  },
  {
    id: 59,
    title: "Metal Gear Solid",
    console: "PS1",
    genre: "Ação/Stealth",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=MGS",
    rom: "https://archive.org/download/chd_psx/Metal%20Gear%20Solid%20%28USA%29%20%28Disc%201%29%20%28Rev%201%29.chd",
  },
  {
    id: 60,
    title: "Oddworld: Abe's Oddysee",
    console: "PS1",
    genre: "Plataforma/Puzzle",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Oddworld",
    rom: "https://archive.org/download/chd_psx/Oddworld%20-%20Abe%27s%20Oddysee%20%28USA%29.chd",
  },
  {
    id: 61,
    title: "Parasite Eve",
    console: "PS1",
    genre: "RPG/Terror",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300&text=Parasite+Eve",
    rom: "https://archive.org/download/chd_psx/Parasite%20Eve%20%28USA%29%20%28Disc%201%29.chd",
  },
  {
    id: 62,
    title: "Resident Evil 2",
    console: "PS1",
    genre: "Terror/Ação",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=RE+2",
    rom: "https://archive.org/download/chd_psx/Resident%20Evil%202%20%28USA%29%20%28Leon%29.chd",
  },
  {
    id: 63,
    title: "Ridge Racer Type 4",
    console: "PS1",
    genre: "Corrida",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Ridge+Racer+4",
    rom: "https://archive.org/download/chd_psx/Ridge%20Racer%20Type%204%20%28USA%29.chd",
  },
  {
    id: 64,
    title: "Silent Hill",
    console: "PS1",
    genre: "Terror",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Silent+Hill",
    rom: "https://archive.org/download/chd_psx/Silent%20Hill%20%28USA%29.chd",
  },
  {
    id: 65,
    title: "Spyro the Dragon",
    console: "PS1",
    genre: "Plataforma",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Spyro",
    rom: "https://archive.org/download/chd_psx/Spyro%20the%20Dragon%20%28USA%29.chd",
  },
  {
    id: 66,
    title: "Suikoden II",
    console: "PS1",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Suikoden+II",
    rom: "https://archive.org/download/chd_psx/Suikoden%20II%20%28USA%29.chd",
  },
  {
    id: 67,
    title: "Tekken 3",
    console: "PS1",
    genre: "Luta",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Tekken+3",
    rom: "https://archive.org/download/chd_psx/Tekken%203%20%28USA%29.chd",
  },
  {
    id: 68,
    title: "Tomb Raider",
    console: "PS1",
    genre: "Ação/Aventura",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Tomb+Raider",
    rom: "https://archive.org/download/chd_psx/Tomb%20Raider%20%28USA%29.chd",
  },
  {
    id: 69,
    title: "Tony Hawk's Pro Skater",
    console: "PS1",
    genre: "Esporte",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=THPS",
    rom: "https://archive.org/download/chd_psx/Tony%20Hawk%27s%20Pro%20Skater%20%28USA%29.chd",
  },
  {
    id: 70,
    title: "Vagrant Story",
    console: "PS1",
    genre: "RPG",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Vagrant+Story",
    rom: "https://archive.org/download/chd_psx/Vagrant%20Story%20%28USA%29.chd",
  },
  {
    id: 71,
    title: "Wipeout XL",
    console: "PS1",
    genre: "Corrida",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Wipeout+XL",
    rom: "https://archive.org/download/chd_psx/Wipeout%20XL%20%28USA%29.chd",
  },

  // PlayStation 2 Games (19 jogos)
  {
    id: 72,
    title: "Devil May Cry",
    console: "PS2",
    genre: "Ação",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=DMC",
    rom: "https://archive.org/download/chd_ps2/Devil%20May%20Cry%20%28USA%29.chd",
  },
  {
    id: 73,
    title: "Devil May Cry 3",
    console: "PS2",
    genre: "Ação",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=DMC+3",
    rom: "https://archive.org/download/chd_ps2/Devil%20May%20Cry%203%20-%20Dante%27s%20Awakening%20%28USA%29.chd",
  },
  {
    id: 74,
    title: "Final Fantasy X",
    console: "PS2",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=FF+X",
    rom: "https://archive.org/download/chd_ps2/Final%20Fantasy%20X%20%28USA%29.chd",
  },
  {
    id: 75,
    title: "God of War",
    console: "PS2",
    genre: "Ação",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=God+of+War",
    rom: "https://archive.org/download/chd_ps2/God%20of%20War%20%28USA%29.chd",
  },
  {
    id: 76,
    title: "God of War 2",
    console: "PS2",
    genre: "Ação",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=GOW+2",
    rom: "https://archive.org/download/chd_ps2/God%20of%20War%20II%20%28USA%29.chd",
  },
  {
    id: 77,
    title: "Grand Theft Auto III",
    console: "PS2",
    genre: "Ação",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=GTA+III",
    rom: "https://archive.org/download/chd_ps2/Grand%20Theft%20Auto%20-%20Vice%20City%20%28USA%29.chd",
  },
  {
    id: 78,
    title: "Grand Theft Auto: Vice City",
    console: "PS2",
    genre: "Ação",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=GTA+VC",
    rom: "https://archive.org/download/chd_ps2/Grand%20Theft%20Auto%20-%20Vice%20City%20%28USA%29.chd",
  },
  {
    id: 79,
    title: "Grand Theft Auto: San Andreas",
    console: "PS2",
    genre: "Ação/Aventura",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=GTA+SA",
    rom: "https://archive.org/download/chd_ps2/Grand%20Theft%20Auto%20-%20San%20Andreas%20%28USA%29.chd",
  },
  {
    id: 80,
    title: "Gran Turismo 4",
    console: "PS2",
    genre: "Corrida",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=GT+4",
    rom: "https://archive.org/download/chd_ps2/Gran%20Turismo%204%20%28USA%29.chd",
  },
  {
    id: 81,
    title: "Ico",
    console: "PS2",
    genre: "Aventura",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Ico",
    rom: "https://archive.org/download/chd_ps2/Ico%20%28USA%29.chd",
  },
  {
    id: 82,
    title: "Jak and Daxter",
    console: "PS2",
    genre: "Plataforma",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Jak+Daxter",
    rom: "https://archive.org/download/chd_ps2/Jak%20and%20Daxter%20-%20The%20Precursor%20Legacy%20%28USA%29.chd",
  },
  {
    id: 83,
    title: "Kingdom Hearts",
    console: "PS2",
    genre: "RPG",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Kingdom+Hearts",
    rom: "https://archive.org/download/chd_ps2/Kingdom%20Hearts%20%28USA%29.chd",
  },
  {
    id: 84,
    title: "Kingdom Hearts II",
    console: "PS2",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=KH+II",
    rom: "https://archive.org/download/chd_ps2/Kingdom%20Hearts%20II%20%28USA%29.chd",
  },
  {
    id: 85,
    title: "Metal Gear Solid 2",
    console: "PS2",
    genre: "Ação/Stealth",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=MGS+2",
    rom: "https://archive.org/download/chd_ps2/Metal%20Gear%20Solid%202%20-%20Sons%20of%20Liberty%20%28USA%29.chd",
  },
  {
    id: 86,
    title: "Metal Gear Solid 3",
    console: "PS2",
    genre: "Ação/Stealth",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=MGS+3",
    rom: "https://archive.org/download/chd_ps2/Metal%20Gear%20Solid%203%20-%20Snake%20Eater%20%28USA%29.chd",
  },
  {
    id: 87,
    title: "Okami",
    console: "PS2",
    genre: "Aventura",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Okami",
    rom: "https://archive.org/download/chd_ps2/Okami%20%28USA%29.chd",
  },
  {
    id: 88,
    title: "Persona 4",
    console: "PS2",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Persona+4",
    rom: "https://archive.org/download/chd_ps2/Shin%20Megami%20Tensei%20-%20Persona%204%20%28USA%29.chd",
  },
  {
    id: 89,
    title: "Shadow of the Colossus",
    console: "PS2",
    genre: "Aventura",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=SOTC",
    rom: "https://archive.org/download/chd_ps2/Shadow%20of%20the%20Colossus%20%28USA%29.chd",
  },
  {
    id: 90,
    title: "Silent Hill 2",
    console: "PS2",
    genre: "Terror",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=SH+2",
    rom: "https://archive.org/download/chd_ps2/Silent%20Hill%202%20%28USA%29.chd",
  },

  // Xbox 360 Games (22 jogos)
  {
    id: 91,
    title: "Alan Wake",
    console: "Xbox 360",
    genre: "Terror/Ação",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Alan+Wake",
    rom: "xbox360/alan-wake.iso",
  },
  {
    id: 92,
    title: "Assassin's Creed II",
    console: "Xbox 360",
    genre: "Ação/Aventura",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=AC+II",
    rom: "xbox360/assassins-creed-2.iso",
  },
  {
    id: 93,
    title: "Batman: Arkham City",
    console: "Xbox 360",
    genre: "Ação",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Batman+AC",
    rom: "xbox360/batman-arkham-city.iso",
  },
  {
    id: 94,
    title: "BioShock",
    console: "Xbox 360",
    genre: "FPS/RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=BioShock",
    rom: "xbox360/bioshock.iso",
  },
  {
    id: 95,
    title: "Borderlands 2",
    console: "Xbox 360",
    genre: "FPS/RPG",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Borderlands+2",
    rom: "xbox360/borderlands-2.iso",
  },
  {
    id: 96,
    title: "Call of Duty 4: Modern Warfare",
    console: "Xbox 360",
    genre: "FPS",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=COD+4",
    rom: "xbox360/cod4-mw.iso",
  },
  {
    id: 97,
    title: "Call of Duty: Modern Warfare 2",
    console: "Xbox 360",
    genre: "FPS",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=COD+MW2",
    rom: "xbox360/cod-mw2.iso",
  },
  {
    id: 98,
    title: "Dark Souls",
    console: "Xbox 360",
    genre: "RPG/Ação",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Dark+Souls",
    rom: "xbox360/dark-souls.iso",
  },
  {
    id: 99,
    title: "Fallout 3",
    console: "Xbox 360",
    genre: "RPG",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Fallout+3",
    rom: "xbox360/fallout-3.iso",
  },
  {
    id: 100,
    title: "Forza Horizon",
    console: "Xbox 360",
    genre: "Corrida",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Forza+Horizon",
    rom: "xbox360/forza-horizon.iso",
  },
  {
    id: 101,
    title: "Gears of War",
    console: "Xbox 360",
    genre: "Ação/TPS",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Gears+1",
    rom: "xbox360/gears-of-war.iso",
  },
  {
    id: 102,
    title: "Gears of War 2",
    console: "Xbox 360",
    genre: "Ação/TPS",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Gears+2",
    rom: "xbox360/gears-of-war-2.iso",
  },
  {
    id: 103,
    title: "Grand Theft Auto IV",
    console: "Xbox 360",
    genre: "Ação",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=GTA+IV",
    rom: "xbox360/gta-iv.iso",
  },
  {
    id: 104,
    title: "Halo 3",
    console: "Xbox 360",
    genre: "FPS",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Halo+3",
    rom: "xbox360/halo-3.iso",
  },
  {
    id: 105,
    title: "Halo: Reach",
    console: "Xbox 360",
    genre: "FPS",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Halo+Reach",
    rom: "xbox360/halo-reach.iso",
  },
  {
    id: 106,
    title: "Limbo",
    console: "Xbox 360",
    genre: "Puzzle/Plataforma",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Limbo",
    rom: "xbox360/limbo.iso",
  },
  {
    id: 107,
    title: "Mass Effect 2",
    console: "Xbox 360",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Mass+Effect+2",
    rom: "xbox360/mass-effect-2.iso",
  },
  {
    id: 108,
    title: "Minecraft",
    console: "Xbox 360",
    genre: "Sandbox",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Minecraft",
    rom: "xbox360/minecraft.iso",
  },
  {
    id: 109,
    title: "Ori and the Blind Forest",
    console: "Xbox 360",
    genre: "Plataforma",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Ori",
    rom: "xbox360/ori-blind-forest.iso",
  },
  {
    id: 110,
    title: "Portal 2",
    console: "Xbox 360",
    genre: "Puzzle",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Portal+2",
    rom: "xbox360/portal-2.iso",
  },
  {
    id: 111,
    title: "Red Dead Redemption",
    console: "Xbox 360",
    genre: "Ação/Aventura",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=RDR",
    rom: "xbox360/red-dead-redemption.iso",
  },
  {
    id: 112,
    title: "The Elder Scrolls V: Skyrim",
    console: "Xbox 360",
    genre: "RPG",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Skyrim",
    rom: "xbox360/skyrim.iso",
  },
]

const consoles = [
  { name: "SNES", count: 23, icon: "🎮" },
  { name: "N64", count: 23, icon: "🕹️" },
  { name: "PS1", count: 25, icon: "💿" },
  { name: "PS2", count: 19, icon: "📀" },
  { name: "Xbox 360", count: 22, icon: "🎯" },
]

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [selectedGame, setSelectedGame] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConsole, setSelectedConsole] = useState("Todos")
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [onlineUsers, setOnlineUsers] = useState(0)

  useEffect(() => {
    // Simulate fetching online users
    setOnlineUsers(Math.floor(Math.random() * 100))
  }, [])

  const handleLogin = () => {
    // Simulate login
    if (loginForm.email === "admin@jsgaming.com" && loginForm.password === "retro2024") {
      setIsLoggedIn(true)
      setCurrentUser({ name: "Admin", isAdmin: true })
    } else {
      alert("Credenciais inválidas")
    }
  }

  const filteredGames = featuredGames.filter((game) => {
    if (selectedConsole !== "Todos" && game.console !== selectedConsole) return false
    if (!game.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />

        <Card className="w-full max-w-md bg-black/80 border-2 border-yellow-500/30 backdrop-blur-xl shadow-2xl shadow-yellow-500/20">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <img
                src="/js-gaming-hub-logo.png"
                alt="J.S Gaming Hub"
                className="w-24 h-24 rounded-2xl shadow-lg shadow-yellow-500/30"
              />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                J.S Gaming Hub
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2">Servidor Premium de Jogos Retrô</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="bg-gray-900/50 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-500"
              />
              <Input
                type="password"
                placeholder="Senha"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="bg-gray-900/50 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-500"
              />
              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold shadow-lg shadow-yellow-500/30"
              >
                <Crown className="w-4 h-4 mr-2" />
                Entrar no Gaming Hub
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-yellow-500/20">
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20">
                <Gamepad2 className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                <p className="text-xs text-gray-300">112+ Jogos</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20">
                <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                <p className="text-xs text-gray-300">Sem Lag</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20">
                <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                <p className="text-xs text-gray-300">HD Quality</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20">
                <Users className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                <p className="text-xs text-gray-300">Multiplayer</p>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400">
              Credenciais de teste: admin@jsgaming.com / retro2024
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-yellow-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/js-gaming-hub-logo.png"
                alt="J.S Gaming Hub"
                className="w-12 h-12 rounded-xl shadow-lg shadow-yellow-500/30"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  J.S Gaming Hub
                </h1>
                <p className="text-sm text-gray-400">Servidor Premium</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                <Users className="w-3 h-3 mr-1" />
                {onlineUsers} Online
              </Badge>

              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8 border-2 border-yellow-500/50">
                  <AvatarImage src="/js-gaming-hub-logo.png" />
                  <AvatarFallback className="bg-yellow-500 text-black font-bold">
                    {currentUser?.isAdmin ? "👑" : "🎮"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-yellow-400">{currentUser?.name}</p>
                  <p className="text-xs text-gray-400">{currentUser?.isAdmin ? "Administrador" : "Jogador"}</p>
                </div>
              </div>

              <Button
                onClick={() => setIsLoggedIn(false)}
                variant="outline"
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar jogos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900/50 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-500"
              />
            </div>

            <Tabs value={selectedConsole} onValueChange={setSelectedConsole} className="w-full md:w-auto">
              <TabsList className="bg-gray-900/50 border border-yellow-500/30">
                <TabsTrigger value="Todos" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Todos
                </TabsTrigger>
                {consoles.map((console) => (
                  <TabsTrigger
                    key={console.name}
                    value={console.name}
                    className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                  >
                    {console.icon} {console.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              className="bg-gray-900/50 border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 group"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-black font-bold">{game.console}</Badge>
                  <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-white">{game.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 text-white group-hover:text-yellow-400 transition-colors">
                  {game.title}
                </CardTitle>
                <CardDescription className="text-gray-400 mb-4">{game.genre}</CardDescription>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold shadow-lg shadow-yellow-500/20"
                      onClick={() => setSelectedGame(game)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Jogar Agora
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-black border-yellow-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-yellow-400">{game.title}</DialogTitle>
                      <DialogDescription className="text-gray-300">
                        {game.console} • {game.genre}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedGame && <GamePlayer game={selectedGame} />}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Components */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CloudServerStatus />
          <DeviceCompatibility />
          <InstallationGuide />
        </div>
      </main>
    </div>
  )
}
