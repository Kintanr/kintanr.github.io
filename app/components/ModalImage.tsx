'use client';
import Image from 'next/image';
type ModalProps = {
  title?: string;
  image?: string;
  onClose?: () => void;
};

import { forwardRef } from 'react';

export const ModalImage = forwardRef<HTMLDialogElement, ModalProps>(
  ({ image, title, onClose }, ref) => {
    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box max-w-4xl p-0">
          {image && title && (
            <Image src={image} alt={title} width={900} height={800} className="rounded-lg" />
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    );
  }
);
