import { ScaffoldSuccess } from "@/components/scaffold-success"

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <ScaffoldSuccess id={id} />
  )
}
