"use client";

import { Miner } from "@/app/miners/lib/api";

type Props = {
  miner: Miner;
  onEdit: (miner: Miner) => void;
  onDelete: (id: string) => void;
};

export default function MinerCard({ miner, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 flex flex-col gap-3 hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-300">{miner.title}</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">{miner.brand} {miner.modelname ? `| ${miner.modelname}` : ""}</div>
        </div>
        <div className="ml-auto space-x-2">
          {miner.hotMiner && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Hot</span>}
          {miner.topSeller && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Top Seller</span>}
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {miner.images?.length
          ? miner.images.map((img, i) => (
              <img key={i} src={img.url} alt="" className="w-20 h-20 object-cover rounded shadow border" />
            ))
          : <div className="italic text-gray-400 w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">No Image</div>
        }
      </div>
      <div className="flex flex-col gap-1">
        <span><span className="font-semibold text-gray-700">Price:</span> ${miner.price} {miner.discountPrice > 0 && <span className="line-through text-red-400 ml-2">${miner.discountPrice}</span>}</span>
        <span><span className="font-semibold text-gray-700">Stock:</span> {miner.stockQty}</span>
        <span><span className="font-semibold text-gray-700">Category:</span> {miner.category}</span>
        <span><span className="font-semibold text-gray-700">Min/Max Qty:</span> {miner.minQty}/{miner.maxQty}</span>
        <span><span className="font-semibold text-gray-700">Grade:</span> {miner.grade}</span>
        {miner.outputVoltage && <span><span className="font-semibold text-gray-700">Output:</span> {miner.outputVoltage}</span>}
        {miner.coolingMethod && <span><span className="font-semibold text-gray-700">Cooling:</span> {miner.coolingMethod}</span>}
        {miner.description && <span className="mt-1 text-gray-700">{miner.description}</span>}
      </div>
      <div className="flex gap-3 mt-3">
        <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded" onClick={() => onEdit(miner)}>Edit</button>
        <button type="button" className="bg-red-500 hover:bg-red-700 text-white px-3 py-1.5 rounded" onClick={() => onDelete(miner.id)}>Delete</button>
      </div>
    </div>
  );
}
