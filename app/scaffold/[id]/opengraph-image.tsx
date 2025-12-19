import { ImageResponse } from "next/og";
import { retrieveScaffold } from "@/actions/scaffold-actions";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
type Props = {
  params: Promise<{ id: string }>;
};
export default async function Image({ params }: Props) {
  const { id } = await params;
  const scaffold = await retrieveScaffold(id);
  const BBHBartle = await readFile(
    join(process.cwd(), "public/fonts/BBHBartle-Regular.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        fontSize: 44,
        background: "black",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",

        color: "white",
        fontFamily: "BBH Bartle",
      }}
    >
      <p
        style={{
          textTransform: "capitalize",

          margin: 0,
          padding: "20px",
   
        }}
      >
        {scaffold ? `${scaffold.name}` : "Scaffold"}
      </p>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "BBH Bartle",
          data: BBHBartle,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
