"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface BackgroundProps {
  environment?: "cosmic" | "ocean" | "forest" | "sunset" | "aurora" | "nebula"
  children: React.ReactNode
}

export function DynamicBackground({ environment = "cosmic", children }: BackgroundProps) {
  const [currentEnv, setCurrentEnv] = useState(environment)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-cycle through environments every 30 seconds
  useEffect(() => {
    const environments = ["cosmic", "ocean", "forest", "sunset", "aurora", "nebula"] as const
    let currentIndex = environments.indexOf(currentEnv)

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % environments.length
        setCurrentEnv(environments[currentIndex])
        setIsAnimating(false)
      }, 500)
    }, 30000)

    return () => clearInterval(interval)
  }, [currentEnv])

  const getEnvironmentStyles = (env: string) => {
    switch (env) {
      case "cosmic":
        return {
          primary: "from-purple-900/80 via-blue-900/80 to-indigo-900/80",
          secondary: "from-pink-800/60 via-purple-800/60 to-blue-800/60",
          accent: "from-cyan-600/40 via-purple-600/40 to-pink-600/40",
          particles: "bg-white",
        }
      case "ocean":
        return {
          primary: "from-blue-900/80 via-teal-900/80 to-cyan-900/80",
          secondary: "from-teal-800/60 via-blue-800/60 to-indigo-800/60",
          accent: "from-cyan-600/40 via-teal-600/40 to-blue-600/40",
          particles: "bg-cyan-300",
        }
      case "forest":
        return {
          primary: "from-green-900/80 via-emerald-900/80 to-teal-900/80",
          secondary: "from-emerald-800/60 via-green-800/60 to-teal-800/60",
          accent: "from-lime-600/40 via-green-600/40 to-emerald-600/40",
          particles: "bg-green-300",
        }
      case "sunset":
        return {
          primary: "from-orange-900/80 via-red-900/80 to-pink-900/80",
          secondary: "from-yellow-800/60 via-orange-800/60 to-red-800/60",
          accent: "from-yellow-600/40 via-orange-600/40 to-red-600/40",
          particles: "bg-orange-300",
        }
      case "aurora":
        return {
          primary: "from-green-900/80 via-teal-900/80 to-purple-900/80",
          secondary: "from-cyan-800/60 via-green-800/60 to-purple-800/60",
          accent: "from-green-600/40 via-cyan-600/40 to-purple-600/40",
          particles: "bg-green-300",
        }
      case "nebula":
        return {
          primary: "from-violet-900/80 via-fuchsia-900/80 to-pink-900/80",
          secondary: "from-purple-800/60 via-violet-800/60 to-fuchsia-800/60",
          accent: "from-violet-600/40 via-fuchsia-600/40 to-pink-600/40",
          particles: "bg-fuchsia-300",
        }
      default:
        return {
          primary: "from-purple-900/80 via-blue-900/80 to-indigo-900/80",
          secondary: "from-pink-800/60 via-purple-800/60 to-blue-800/60",
          accent: "from-cyan-600/40 via-purple-600/40 to-pink-600/40",
          particles: "bg-white",
        }
    }
  }

  const styles = getEnvironmentStyles(currentEnv)

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Base gradient layers */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${styles.primary} transition-all duration-1000 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-tl ${styles.secondary} transition-all duration-1000 delay-200 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-tr ${styles.accent} transition-all duration-1000 delay-400 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial ${styles.primary} rounded-full blur-3xl animate-pulse-slow opacity-30`}
        />
        <div
          className={`absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-radial ${styles.secondary} rounded-full blur-3xl animate-bounce-slow opacity-25`}
        />
        <div
          className={`absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial ${styles.accent} rounded-full blur-2xl animate-spin-slow opacity-20 transform -translate-x-1/2 -translate-y-1/2`}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${styles.particles} rounded-full opacity-30 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Moving gradient waves */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${styles.primary} opacity-10 animate-wave-x`}
          style={{ animationDuration: "20s" }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${styles.secondary} opacity-10 animate-wave-y`}
          style={{ animationDuration: "25s" }}
        />
      </div>

      {/* Environment indicator */}
      <div className="absolute top-4 right-4 z-50">
        <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
          <span className="text-white/80 text-sm font-medium capitalize">{currentEnv} Mode</span>
        </div>
      </div>

      {/* Environment selector */}
      <div className="absolute top-4 left-4 z-50">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2 border border-white/10">
          <div className="flex gap-2">
            {["cosmic", "ocean", "forest", "sunset", "aurora", "nebula"].map((env) => (
              <button
                key={env}
                onClick={() => {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentEnv(env as any)
                    setIsAnimating(false)
                  }, 500)
                }}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  currentEnv === env ? "border-white scale-110" : "border-white/30 hover:border-white/60"
                }`}
                style={{
                  background: getEnvironmentGradient(env),
                }}
                title={env}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function getEnvironmentGradient(env: string) {
  switch (env) {
    case "cosmic":
      return "linear-gradient(45deg, #4c1d95, #1e40af, #7c3aed)"
    case "ocean":
      return "linear-gradient(45deg, #1e40af, #0891b2, #0d9488)"
    case "forest":
      return "linear-gradient(45deg, #166534, #059669, #0d9488)"
    case "sunset":
      return "linear-gradient(45deg, #ea580c, #dc2626, #e11d48)"
    case "aurora":
      return "linear-gradient(45deg, #059669, #0891b2, #7c3aed)"
    case "nebula":
      return "linear-gradient(45deg, #7c2d12, #a21caf, #e11d48)"
    default:
      return "linear-gradient(45deg, #4c1d95, #1e40af, #7c3aed)"
  }
}
