"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdDeleteForever } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";

const BtnEditCategory = ({ handleDelete }: { handleDelete: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const confirmAndDelete = () => {
    handleDelete();
    setIsOpen(false);
  };

  const modalComponent = (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-9999 cursor-default p-4"
      style={{ direction: "ltr" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl border border-custom-green max-w-sm w-full relative text-custom-green dark:text-primary animate-fade-in"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl text-red-500">
            <FiAlertTriangle size={22} />
          </div>
          <h3 className="text-lg font-bold tracking-tight">Confirm Delete</h3>
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed text-left pl-1">
          Are you sure you want to delete this category? This action cannot be
          undone.
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
            onClick={confirmAndDelete}
            className="px-4 py-2.5 bg-red-500 hover:bg-red-600 active:scale-98 transition-all text-white font-semibold rounded-xl text-xs cursor-pointer shadow-md shadow-red-500/10"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Delete category"
        className="p-2 rounded-lg border border-custom-green hover:text-custom-green transition-all cursor-pointer"
      >
        <MdDeleteForever size={18} />
      </button>

      {isOpen && mounted && createPortal(modalComponent, document.body)}
    </>
  );
};

export default BtnEditCategory;
