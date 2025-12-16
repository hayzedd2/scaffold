import { CopyLink } from "./copy-link";

export const ScaffoldLink = ({ link }: { link: string }) => {
  return (
    <div className="w-full rounded-sm border-2 p-2 border-dashed flex gap-2 items-center">
      <h4 className="text-xs truncate text-[#eb3dd9]">{link}</h4>
      <CopyLink link={link} />
    </div>
  );
};
