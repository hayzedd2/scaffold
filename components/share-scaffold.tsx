"use client";
import { ScaffoldLink } from "./scaffold-link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyMedia } from "./ui/empty";
import { IconBrandFacebook, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";

export const ShareScaffold = ({ link }: { link: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Share</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/*<DialogTitle>Share Scaffold</DialogTitle>*/}
          {/*<DialogDescription>Give your scaffold a name.</DialogDescription>*/}
        </DialogHeader>
        <div>
           <h5 className="text-sm mb-2">Share this link via</h5>
           <div className="flex gap-2">
             <EmptyMedia variant={"icon"}>
               <IconBrandX/>
             </EmptyMedia>
             <EmptyMedia variant={"icon"}>
               <IconBrandLinkedin/>
             </EmptyMedia>
             <EmptyMedia variant={"icon"}>
               <IconBrandFacebook/>
             </EmptyMedia>
           </div>
        </div>
        <div className="w-full min-w-0">
          {/*<h5 className="text-sm mb-1">Copy Link</h5>*/}
          <ScaffoldLink link={link} />
        </div>
        
      </DialogContent>
    </Dialog>
  );
};
