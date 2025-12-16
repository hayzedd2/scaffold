import {
  IconArrowBackUp,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ScaffoldLink } from "./scaffold-link";
import { generateScaffoldLink } from "@/lib/utils";

export function ScaffoldSuccess({ id }: { id: string }) {
  const link = generateScaffoldLink(id);
  return (
    <Empty className="h-[100dvh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconRosetteDiscountCheckFilled />
        </EmptyMedia>
        <EmptyTitle>Scaffold created!</EmptyTitle>
        <EmptyDescription>
          Share your scaffold with others by copying the link below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <ScaffoldLink link={link} />
      </EmptyContent>
      {/*<div className="flex gap-2">
        <ShareScaffold link="http://localhost:3001/scaffold/6fbb5024-8f0d-419f-a364-10f18fd9cfca/" />
        <CreateScaffold />
      </div>*/}
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="/">
          Back to home <IconArrowBackUp />
        </a>
      </Button>
    </Empty>
  );
}
