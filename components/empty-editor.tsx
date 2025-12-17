import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { IconMoodEmpty } from "@tabler/icons-react"

export function EmptyEditor() {
  return (
    <Empty className="flex-1 h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconMoodEmpty  />
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
