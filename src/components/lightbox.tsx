"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label?: string;
  closeLabel?: string;
};

export default function Lightbox({ open, onClose, children, label = "Image preview", closeLabel = "Close image" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      aria-label={label}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none items-center justify-center overflow-y-auto border-0 bg-transparent p-4 text-white backdrop:bg-black/85 open:flex sm:p-8"
    >
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-xl text-white hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={closeLabel}
      >
        <span aria-hidden="true">×</span>
      </button>
      {children}
    </dialog>
  );
}
