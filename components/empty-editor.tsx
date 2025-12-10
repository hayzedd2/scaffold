import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { CircleOffIcon } from "lucide-react"

export function EmptyEditor() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleOffIcon  />
        </EmptyMedia>
        <EmptyTitle>No file selected Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t selected any file yet. Get started by selecting  
          your first file.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
