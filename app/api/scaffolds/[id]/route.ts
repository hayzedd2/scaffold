import { NextResponse, NextRequest } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: RouteContext<"/api/scaffolds/[id]">,
) {
  const { id } = await params;
  try {
    const result = await sql`
      SELECT * FROM scaffolds WHERE id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Scaffold not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching scaffold:", error);
    return NextResponse.json(
      { error: "Failed to fetch scaffold" },
      { status: 500 },
    );
  }
}
