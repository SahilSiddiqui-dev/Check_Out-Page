"use client"

import type React from "react"

interface BackgroundProps {
  children: React.ReactNode
}

export function BeautifulBackground({ children }: BackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900" />

      {/* Layered gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-transparent to-purple-950/30" />
      <div className="absolute inset-0 bg-gradient-to-bl from-indigo-950/20 via-transparent to-cyan-950/20" />

      {/* Beautiful floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-gentle-float" />
        <div className="absolute -top-24 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl animate-gentle-float-delayed" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-gentle-float-slow" />
        <div className="absolute bottom-1/4 -left-32 w-72 h-72 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-2xl animate-gentle-float" />
        <div className="absolute -bottom-48 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl animate-gentle-float-delayed" />
      </div>

      {/* Elegant mesh pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, white 2px, transparent 2px),
              radial-gradient(circle at 50% 50%, white 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px, 80px 80px, 40px 40px",
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
