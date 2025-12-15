import { retrieveScaffold } from "@/actions/scaffold-actions";
import { App } from "@/components/app";
import { InvalidScaffold } from "@/components/invalid-scaffold";
import { IScaffold } from "@/type";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const scaffold = await retrieveScaffold(id);
  return (
    <section>
      {scaffold ? (
        <App isAuthor={false} scaffold={scaffold as unknown as IScaffold} />
      ) : (
        <InvalidScaffold/>
      )}
    </section>
  );
};

export default page;
