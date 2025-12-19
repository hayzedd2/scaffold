import { retrieveScaffold } from "@/actions/scaffold-actions";
import { App } from "@/components/app";
import { InvalidScaffold } from "@/components/invalid-scaffold";
import { IScaffold } from "@/type";
import { Metadata } from "next";
type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const scaffold = await retrieveScaffold(id);
  
  const title = scaffold ? `${scaffold.name} | Scaffold` : "Scaffold";
  const description = "Fastest way to share minimal, contextual code examples.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const ogImageUrl = `${baseUrl}/scaffold/${id}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/scaffold/${id}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  const scaffold = await retrieveScaffold(id);
  return (
    <section>
      {scaffold ? (
        <App
          isAuthor={false}
          scaffold={scaffold as unknown as IScaffold}
          id={id}
        />
      ) : (
        <InvalidScaffold />
      )}
    </section>
  );
};

export default page;
