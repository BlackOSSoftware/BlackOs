export type ImageRef = { url: string; public_id: string; };
export type Miner = {
    id: string;
    title: string;
    brand?: string;
    modelname?: string;
    description?: string;
    outputVoltage?: string;
    coolingMethod?: string;
    category?: string;
    price: number;
    discountPrice: number;
    stockQty: number;
    minQty: number;
    maxQty: number;
    images?: ImageRef[];
    grade: "New" | "Refurbised";
    // warranty: string;
    hotMiner: boolean;
    topSeller: boolean;
};


export async function fetchMiners(): Promise<Miner[]> {
    const res = await fetch('/api/miner');
    return res.json();

}
export async function createMiner(data: Miner): Promise<Miner> {
  const res = await fetch("/api/miner", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // send full Miner object
  });

  let resData;
  try {
    resData = await res.json();
  } catch {
    throw new Error(`Server returned empty response with status ${res.status}`);
  }

  if (!res.ok) throw new Error(resData.error ?? "Create failed");
  return resData;
}


export async function updateMiner(id: string, data: Miner) {
    const res = await fetch(`/api/miner/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    console.log(id, res, 'res')

    if (!res.ok) {
        const text = await res.text();
        console.error("Update failed:", res.status, text);
        throw new Error(`Failed to update miner: ${res.status}`);
    }
    return res.json();
}
export async function deleteMiner(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/miner/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error((await res.json()).error ?? "Delete failed");
    return res.json();
}
