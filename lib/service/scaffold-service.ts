import { TreeNode } from "@/type";

export const scaffoldService = {
  createScaffold: async (name: string, children: TreeNode[]) => {
    const res = await fetch(`/api/scaffolds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, children }),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error(`Failed to create scaffold: ${res.status}`);
    }
    const data = await res.json();
    return data
  },
  retrieveScaffold: async (id: string) => {
    const res = await fetch(`/api/scaffolds/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to retrieve scaffold: ${res.status}`);
    }
    const data = await res.json();
    return data;
  },
};
