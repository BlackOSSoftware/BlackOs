"use client";
import { createMiner, deleteMiner, fetchMiners, Miner, updateMiner } from "@/app/miners/lib/api";
import { useEffect, useState } from "react";
import MinerForm from "./minorForm";
import MinerCard from "./minerCard";

export default function MinerList() {
  const [miners, setMiners] = useState<Miner[]>([]);
  const [editing, setEditing] = useState<Miner | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadMiners(); }, []);
  const loadMiners = async () => setMiners(await fetchMiners());

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this miner?")) return;
    await deleteMiner(id);
    setMiners(prev => prev.filter(m => m.id !== id));
  };

  const handleEdit = (miner: Miner) => {
    setEditing(miner);
    setShowForm(true);
  };

  const handleSubmit = async (miner: Miner) => {
    if (editing) {
      const updated = await updateMiner(editing.id, miner);
      setMiners(prev => prev.map(m => m.id === editing.id ? updated : m));
    } else {
      const created = await createMiner(miner);
      setMiners(prev => [created, ...prev]);
    }
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-bl from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-blue-950 dark:to-gray-800">
      {!showForm && (
        <button
          className="bg-gradient-to-br from-blue-600 to-purple-500 text-white px-6 py-2 text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition"
          onClick={() => setShowForm(true)}
        >Add Miner</button>
      )}
      {showForm && <MinerForm onSubmit={handleSubmit} initialData={editing || undefined} onCancel={() => { setEditing(null); setShowForm(false); }} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {miners.map(miner => (
          <MinerCard key={miner.id} miner={miner} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
