"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const animationRef = useRef<number | null>(null)
  const particlesArrayRef = useRef<Particle[]>([])

  // Ensure hydration completes before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const numberOfParticles = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5

        // Theme-aware colors
        const isDark = resolvedTheme === "dark"

        // Purple to red gradient colors - lighter for dark mode, darker for light mode
        const colors = isDark
          ? [
              "#a855f7", // Lighter purple
              "#c084fc",
              "#d8b4fe",
              "#e9d5ff",
              "#f5d0fe",
              "#f0abfc",
              "#e879f9", // Lighter pink
              "#f472b6", // Lighter rose
              "#fb7185", // Lighter red
            ]
          : [
              "#9333ea", // Purple
              "#a855f7",
              "#c026d3",
              "#d946ef",
              "#e879f9",
              "#f472b6",
              "#ec4899", // Pink
              "#f43f5e", // Rose
              "#ef4444", // Red
            ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particlesArrayRef.current = []
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArrayRef.current.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create theme-aware gradient background
      const isDark = resolvedTheme === "dark"
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      if (isDark) {
        // Darker gradient for dark mode
        gradient.addColorStop(0, "#2d1235") // Darker purple
        gradient.addColorStop(1, "#3b0d0d") // Darker red
      } else {
        // Original gradient for light mode
        gradient.addColorStop(0, "#4a044e") // Dark purple
        gradient.addColorStop(1, "#7f1d1d") // Dark red
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArrayRef.current.length; i++) {
        particlesArrayRef.current[i].update()
        particlesArrayRef.current[i].draw()
      }

      // Connect particles with lines
      connectParticles()

      animationRef.current = requestAnimationFrame(animate)
    }

    const connectParticles = () => {
      const particles = particlesArrayRef.current
      const isDark = resolvedTheme === "dark"

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Adjust line opacity based on theme
            const opacity = isDark ? 0.15 - distance / 1000 : 0.1 - distance / 1000
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Initialize and start animation
    init()
    animate()

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, resolvedTheme]) // Re-initialize when theme changes

  // Reinitialize particles when theme changes
  useEffect(() => {
    if (mounted && particlesArrayRef.current.length > 0) {
      // Recreate particles with new theme colors
      particlesArrayRef.current = particlesArrayRef.current.map(() => {
        const canvas = canvasRef.current
        if (!canvas) return {} as Particle

        return new (class {
          x: number
          y: number
          size: number
          speedX: number
          speedY: number
          color: string

          constructor() {
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height
            this.size = Math.random() * 5 + 1
            this.speedX = Math.random() * 3 - 1.5
            this.speedY = Math.random() * 3 - 1.5

            // Theme-aware colors
            const isDark = resolvedTheme === "dark"

            // Purple to red gradient colors - lighter for dark mode, darker for light mode
            const colors = isDark
              ? [
                  "#a855f7", // Lighter purple
                  "#c084fc",
                  "#d8b4fe",
                  "#e9d5ff",
                  "#f5d0fe",
                  "#f0abfc",
                  "#e879f9", // Lighter pink
                  "#f472b6", // Lighter rose
                  "#fb7185", // Lighter red
                ]
              : [
                  "#9333ea", // Purple
                  "#a855f7",
                  "#c026d3",
                  "#d946ef",
                  "#e879f9",
                  "#f472b6",
                  "#ec4899", // Pink
                  "#f43f5e", // Rose
                  "#ef4444", // Red
                ]

            this.color = colors[Math.floor(Math.random() * colors.length)]
          }

          update() {
            this.x += this.speedX
            this.y += this.speedY

            if (this.x > canvas.width) this.x = 0
            else if (this.x < 0) this.x = canvas.width

            if (this.y > canvas.height) this.y = 0
            else if (this.y < 0) this.y = canvas.height
          }

          draw() {
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            ctx.fillStyle = this.color
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
          }
        })()
      })
    }
  }, [resolvedTheme, mounted])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 h-full w-full transition-opacity duration-500" />
}

