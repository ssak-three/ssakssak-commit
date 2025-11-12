"use client";

type BaseProps = {
  open: boolean;
  title?: string;
  description?: string;
  cancelLabel?: string;
  onCancel: () => void;
};

type ModalProps = BaseProps & {
  confirmLabel?: string;
  onConfirm: () => void;
};

function Modal({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-100 rounded-xl bg-white p-6 shadow-lg">
        <p className="mb-2 text-center text-lg font-semibold whitespace-pre-wrap">
          {title}
        </p>

        {description && (
          <p className="mb-4 text-center text-sm whitespace-pre-wrap text-gray-600">
            {description}
          </p>
        )}

        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="w-32 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="w-32 rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function AlertModal({
  open,
  title,
  description,
  cancelLabel,
  onCancel,
}: BaseProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-100 rounded-xl bg-white p-6 shadow-lg">
        <p className="mb-2 text-center text-lg font-semibold whitespace-pre-wrap">
          {title}
        </p>

        {description && (
          <p className="mb-4 text-center text-sm whitespace-pre-wrap text-gray-600">
            {description}
          </p>
        )}

        <div className="flex justify-around">
          <button
            onClick={onCancel}
            className="w-full rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export { Modal, AlertModal };
