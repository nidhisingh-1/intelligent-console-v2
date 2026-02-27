"use client"

import React, { createContext, useContext } from "react"
import type { ScenarioId, Scenario } from "@/lib/demo-scenarios"
import { scenarios } from "@/lib/demo-scenarios"

interface ScenarioContextType {
  activeScenario: ScenarioId
  setActiveScenario: (id: ScenarioId) => void
  scenarioConfig: Scenario
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined)

interface ScenarioProviderProps {
  children: React.ReactNode
  activeScenario: ScenarioId
  setActiveScenario: (id: ScenarioId) => void
}

export function ScenarioProvider({
  children,
  activeScenario,
  setActiveScenario,
}: ScenarioProviderProps) {
  const scenarioConfig = scenarios.find((s) => s.id === activeScenario)!

  return (
    <ScenarioContext.Provider
      value={{ activeScenario, setActiveScenario, scenarioConfig }}
    >
      {children}
    </ScenarioContext.Provider>
  )
}

export function useScenario() {
  const context = useContext(ScenarioContext)
  if (context === undefined) {
    throw new Error("useScenario must be used within a ScenarioProvider")
  }
  return context
}
