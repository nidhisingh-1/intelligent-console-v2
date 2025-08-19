"use client"

import * as React from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { formatTimestamp } from "@/lib/mocks"

interface AudioPlayerProps {
  recordingUrl?: string
  duration: number
  callId: string
}

export function AudioPlayer({ recordingUrl, duration, callId }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [volume, setVolume] = React.useState(100)
  const [playbackRate, setPlaybackRate] = React.useState(1)

  // Mock audio player since we don't have real audio files
  React.useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false)
          return duration
        }
        return prev + playbackRate
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, duration, playbackRate])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)))
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate)
  }

  if (!recordingUrl) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <Volume2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <p>No audio recording available for this call</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Waveform Placeholder */}
      <Card className="p-4">
        <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Volume2 className="mx-auto h-8 w-8 mb-2" />
            <p className="text-sm">Waveform visualization</p>
            <p className="text-xs">Click to seek to timestamp</p>
          </div>
        </div>
      </Card>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider value={[currentTime]} max={duration} step={1} onValueChange={handleSeek} className="w-full" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTimestamp(currentTime)}</span>
          <span>{formatTimestamp(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" onClick={() => handleSkip(-5)}>
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button size="icon" onClick={handlePlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button variant="outline" size="icon" onClick={() => handleSkip(5)}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Additional Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium">Volume</label>
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="flex-1" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">Speed</label>
          <div className="flex gap-1">
            {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
              <Button
                key={rate}
                variant={playbackRate === rate ? "default" : "outline"}
                size="sm"
                onClick={() => handleSpeedChange(rate)}
                className="text-xs"
              >
                {rate}x
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Markers */}
      <div className="space-y-2">
        <label className="text-xs font-medium">Markers</label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentTime(15)}>
            0:15
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentTime(45)}>
            0:45
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentTime(120)}>
            2:00
          </Button>
        </div>
      </div>
    </div>
  )
}
