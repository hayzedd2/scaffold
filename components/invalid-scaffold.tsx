import { IconArrowBackUp, IconMoodEmpty } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { NewScaffold } from "./new-scaffold"

export function InvalidScaffold() {
  return (
    <Empty className="h-[100dvh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconMoodEmpty />
        </EmptyMedia>
        <EmptyTitle>Invalid scaffold</EmptyTitle>
        <EmptyDescription>
          Scaffold link is invalid. Get started by creating a new one.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
       <NewScaffold/>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="/">
          Back to homepage <IconArrowBackUp />
        </a>
      </Button>
    </Empty>
  )
}
