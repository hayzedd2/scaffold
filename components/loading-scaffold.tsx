import { Loader2Icon } from "lucide-react";


export const LoadingScaffold = () => {
  return (
    <div className="flex flex-col items-center text-muted-foreground justify-center h-[100dvh]">
      <Loader2Icon className="animate-spin rounded-full mb-2 size-4"/>
      <p>Loading...</p>
    </div>
  );
};
