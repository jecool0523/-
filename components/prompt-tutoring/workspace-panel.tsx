"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stage1Workspace } from "./workspaces/stage1-workspace"
import { Stage2Workspace } from "./workspaces/stage2-workspace"
import { Stage3Workspace } from "./workspaces/stage3-workspace"
import { Stage4Workspace } from "./workspaces/stage4-workspace"
import { Stage5Workspace } from "./workspaces/stage5-workspace"

interface WorkspacePanelProps {
  currentStage: number
  stageData: any
  onSubmit: (data: any) => void
  isGenerating: boolean
}

export function WorkspacePanel({ currentStage, stageData, onSubmit, isGenerating }: WorkspacePanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>워크스페이스</CardTitle>
      </CardHeader>
      <CardContent>
        {currentStage === 1 && <Stage1Workspace onSubmit={onSubmit} isGenerating={isGenerating} />}
        {currentStage === 2 && (
          <Stage2Workspace previousData={stageData.stage1} onSubmit={onSubmit} isGenerating={isGenerating} />
        )}
        {currentStage === 3 && (
          <Stage3Workspace
            previousData={{ ...stageData.stage1, ...stageData.stage2 }}
            onSubmit={onSubmit}
            isGenerating={isGenerating}
          />
        )}
        {currentStage === 4 && (
          <Stage4Workspace
            previousData={{ ...stageData.stage1, ...stageData.stage2, ...stageData.stage3 }}
            onSubmit={onSubmit}
            isGenerating={isGenerating}
          />
        )}
        {currentStage === 5 && <Stage5Workspace onSubmit={onSubmit} isGenerating={isGenerating} />}
      </CardContent>
    </Card>
  )
}
