"use client";
import { useState } from "react";
import { SquarePen, Trash2, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface BtnDeleteProductProps {
  menuId: string;
  onDeleteSuccess: (id: string) => void;
}

const BtnEditAndDeleteProduct = ({
  menuId,
  onDeleteSuccess,
}: BtnDeleteProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDeleteSuccess(menuId);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg text-zinc-500 hover:text-red-500 hover:bg-red-50/10 dark:hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
        aria-label="Delete product"
      >
        <Trash2 size={20} />
      </button>
      <Link
        href={`/admin/menu/${menuId}`}
        className="p-2 rounded-lg text-zinc-500 hover:text-custom-green hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
        aria-label="Edit product"
      >
        <SquarePen size={20} />
      </Link>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-9999 p-4"
          style={{ direction: "ltr" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800/80 max-w-sm w-full relative text-zinc-900 dark:text-zinc-100 animate-fade-in"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-red-100 dark:bg-red-500/10 rounded-xl text-red-500">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-lg font-bold tracking-tight">
                Confirm Delete
              </h3>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed text-left pl-1">
              Are you sure you want to delete this product? This action will
              remove it permanently and cannot be undone.
            </p>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2.5 bg-red-500 hover:bg-red-600 active:scale-98 transition-all text-white font-semibold rounded-xl text-xs cursor-pointer shadow-md shadow-red-500/10"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BtnEditAndDeleteProduct;
