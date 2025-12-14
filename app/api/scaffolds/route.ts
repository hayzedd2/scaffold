import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { name, children } = await request.json();
    console.log("Received name:", name);
    console.log("Received children:", children);

    if (!name || !children) {
      return NextResponse.json(
        { error: "Name and children are required" },
        { status: 400 },
      );
    }

    const result = await sql`
     INSERT INTO scaffolds (name, children)
     VALUES (${name}, ${JSON.stringify(children)})
     RETURNING *
   `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating scaffold:", error);
    return NextResponse.json(
      { error: "Failed to create scaffold" },
      { status: 500 },
    );
  }
};
