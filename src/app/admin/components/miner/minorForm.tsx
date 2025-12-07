"use client";
import { createMiner, Miner } from "@/app/miners/lib/api";
import { useState } from "react";

type Props = {
  onSubmit: (data: Miner) => void;
  initialData?: Miner;
  onCancel?: () => void;
};

type ImageItem = { url: string; public_id?: string; file?: File; toDelete?: boolean };
type Grade = "New" | "Refurbised";

export default function MinerForm({ onSubmit, initialData, onCancel }: Props) {
  const [form, setForm] = useState<Miner>({
    id: "",
    title: "",
    brand: "",
    modelname: "",
    description: "",
    outputVoltage: "",
    coolingMethod: "",
    category: "",
    price: 0,
    discountPrice: 0,
    stockQty: 0,
    minQty: 1,
    maxQty: 10,
    images: [],
    grade: "New",
    hotMiner: false,
    topSeller: false,
    ...initialData,
  });

  const [images, setImages] = useState<ImageItem[]>(
    (initialData?.images ?? []).map(img => ({ url: img.url, public_id: img.public_id || "" }))
  );

  const handleChange = <K extends keyof Miner>(key: K, value: Miner[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map(file => ({ file, url: URL.createObjectURL(file) }));
    setImages(prev => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (idx: number) => {
    setImages(prev => {
      const img = prev[idx];
      if (img.public_id) img.toDelete = true;
      return prev.filter((_, i) => i !== idx || !!img.toDelete);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Upload new images
      const uploadedImages = await Promise.all(
        images
          .filter(img => img.file)
          .map(
            img =>
              new Promise<{ url: string; public_id: string }>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async () => {
                  try {
                    const base64 = reader.result?.toString();
                    if (!base64) throw new Error("Empty file");
                    const res = await fetch("/api/upload", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ base64 }),
                    });
                    if (!res.ok) throw new Error("Image upload failed");
                    const uploaded = await res.json();
                    resolve(uploaded);
                  } catch (err) {
                    reject(err);
                  }
                };
                reader.onerror = reject;
                reader.readAsDataURL(img.file!);
              })
          )
      );

      // Merge existing Cloudinary images
      const finalImages = [
        ...images.filter(img => img.public_id && !img.toDelete).map(img => ({ url: img.url, public_id: img.public_id! })),
        ...uploadedImages,
      ];

      // Submit full miner object
      const fullMiner: Miner = { ...form, images: finalImages };
      await createMiner(fullMiner);
      alert("Miner saved successfully!");
      onSubmit(fullMiner);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Server error";
      console.error(errorMessage);
      alert(errorMessage);
    }
  };

  const renderLabel = (title: string) => (
    <label className="block font-semibold text-gray-700 dark:text-gray-200">{title}</label>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 max-w-xl mx-auto space-y-5 mt-4 transition-all border border-gray-200 dark:border-gray-800"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        {initialData ? "Edit Miner" : "Add Miner"}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {renderLabel("ID")}
        <input
          placeholder="ID"
          value={form.id}
          required
          onChange={e => handleChange("id", e.target.value)}
          className="input border py-1 px-2 rounded"
          disabled={!!initialData}
        />

        {renderLabel("Title")}
        <input
          placeholder="Title"
          value={form.title}
          required
          onChange={e => handleChange("title", e.target.value)}
          className="input border py-1 px-2 rounded"
        />

        {renderLabel("Brand")}
        <input
          placeholder="Brand"
          value={form.brand}
          onChange={e => handleChange("brand", e.target.value)}
          className="input border py-1 px-2 rounded"
        />

        {renderLabel("Model Name")}
        <input
          placeholder="Model Name"
          value={form.modelname}
          onChange={e => handleChange("modelname", e.target.value)}
          className="input border py-1 px-2 rounded"
        />

        {renderLabel("Description")}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => handleChange("description", e.target.value)}
          className="input border py-1 px-2 rounded"
        />

        {renderLabel("Output Voltage")}
        <input
          placeholder="Output Voltage"
          value={form.outputVoltage}
          onChange={e => handleChange("outputVoltage", e.target.value)}
          className="input border py-1 px-2 rounded"
        />

        {renderLabel("Cooling Method")}
        <input
          placeholder="Cooling Method"
          value={form.coolingMethod}
          onChange={e => handleChange("coolingMethod", e.target.value)}
          className="input border py-1 px-2 rounded"
        />

        {renderLabel("Category")}
        <input
          placeholder="Category"
          value={form.category}
          onChange={e => handleChange("category", e.target.value)}
          className="input border py-1 px-2 rounded"
        />

        {renderLabel("Price")}
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => handleChange("price", Number(e.target.value))}
          className="input border py-1 px-2 rounded"
          required
        />

        {renderLabel("Discount Price")}
        <input
          type="number"
          placeholder="Discount Price"
          value={form.discountPrice}
          onChange={e => handleChange("discountPrice", Number(e.target.value))}
          className="input border py-1 px-2 rounded"
        />

        {renderLabel("Stock Quantity")}
        <input
          type="number"
          placeholder="Stock Quantity"
          value={form.stockQty}
          onChange={e => handleChange("stockQty", Number(e.target.value))}
          className="input border py-1 px-2 rounded"
        />

        <div className="flex gap-2">
          {renderLabel("Min Qty")}
          <input
            type="number"
            placeholder="Min Qty"
            value={form.minQty}
            onChange={e => handleChange("minQty", Number(e.target.value))}
            className="input border py-1 px-2 rounded w-1/2"
          />
          {renderLabel("Max Qty")}
          <input
            type="number"
            placeholder="Max Qty"
            value={form.maxQty}
            onChange={e => handleChange("maxQty", Number(e.target.value))}
            className="input border py-1 px-2 rounded w-1/2"
          />
        </div>

        {renderLabel("Grade")}
        <select
          value={form.grade}
          onChange={e => handleChange("grade", e.target.value as Grade)}
          className="input border py-1 px-2 rounded"
        >
          <option value="New">New</option>
          <option value="Refurbised">Refurbised</option>
        </select>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.hotMiner}
              onChange={e => handleChange("hotMiner", e.target.checked)}
            />{" "}
            Hot Miner
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.topSeller}
              onChange={e => handleChange("topSeller", e.target.checked)}
            />{" "}
            Top Seller
          </label>
        </div>

        {renderLabel("Images")}
        <input type="file" multiple accept="image/*" onChange={handleFiles} className="border rounded px-2 py-1" />

        <div className="flex gap-2 flex-wrap mt-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
              <img src={img.url} alt={`preview-${idx}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-3">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded min-w-24"
        >
          {initialData ? "Update" : "Add"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded min-w-24"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
