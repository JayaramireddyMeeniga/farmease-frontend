import { Edit3, Plus, X } from "lucide-react";

const RotationDialog = ({
  editId,
  isOpen,
  newRotation,
  onCancel,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10251f]/55 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-[0_28px_90px_rgba(16,37,31,0.32)]">
        <div className="flex items-center justify-between border-b border-[#e3eee5] bg-[#f7fbf6] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f6ec] text-[#227341]">
              {editId ? <Edit3 size={18} /> : <Plus size={19} />}
            </span>
            <div>
              <p className="text-lg font-bold text-[#17251e]">
                {editId ? "Edit Rotation" : "Add Rotation"}
              </p>
              <p className="text-sm font-medium text-[#69786d]">
                Plan year and comma-separated crop sequence.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d7e4da] bg-white text-[#405146] transition hover:bg-[#edf5e9]"
            aria-label="Close rotation dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <label className="block">
            <span className="text-xs font-bold uppercase text-[#506057]">
              Year
            </span>
            <input
              type="text"
              value={newRotation.year}
              onChange={(event) => onChange("year", event.target.value)}
              className="mt-2 h-12 w-full rounded-lg border border-[#d7e4da] bg-[#fbfdf9] px-4 text-sm font-semibold text-[#17251e] transition placeholder:text-[#8c9b91] hover:border-[#9dc8af] focus:border-[#2f8f4e]"
              placeholder="Year 1"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase text-[#506057]">
              Crops
            </span>
            <input
              type="text"
              value={newRotation.crops}
              onChange={(event) => onChange("crops", event.target.value)}
              className="mt-2 h-12 w-full rounded-lg border border-[#d7e4da] bg-[#fbfdf9] px-4 text-sm font-semibold text-[#17251e] transition placeholder:text-[#8c9b91] hover:border-[#9dc8af] focus:border-[#2f8f4e]"
              placeholder="Wheat, Legumes, Corn"
            />
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={onSubmit}
              className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(34,115,65,0.22)] transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#f0c766] ${editId ? "bg-[#bd8a1f] hover:bg-[#a57617]" : "bg-[#227341] hover:bg-[#1b5f35]"}`}
            >
              {editId ? <Edit3 size={17} /> : <Plus size={18} />}
              {editId ? "Update Rotation" : "Add Rotation"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="h-12 rounded-lg border border-[#d7e4da] bg-white px-5 text-sm font-bold text-[#405146] transition hover:bg-[#f3f8f2]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotationDialog;
