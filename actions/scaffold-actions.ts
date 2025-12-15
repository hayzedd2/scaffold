import { sql } from "@/lib/db";

export const retrieveScaffold = async (id: string) => {
  try {
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id,
      );

    if (!isUUID) {
      return null;
    }
    const result = await sql`
       SELECT * FROM scaffolds WHERE id = ${id}
     `;
    return result[0] ?? null;
  } catch {
    return null;
  }
};
