import { X } from "lucide-react";
import ScheduleForm from "./ScheduleForm";

const ScheduleDialog = ({
  editId,
  isOpen,
  newSchedule,
  onCancel,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10251f]/55 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-[0_28px_90px_rgba(16,37,31,0.32)]">
        <div className="flex items-center justify-between border-b border-[#e3eee5] bg-[#f7fbf6] px-5 py-4">
          <div>
            <p className="text-lg font-bold text-[#17251e]">
              {editId ? "Edit Irrigation Schedule" : "Add Irrigation Schedule"}
            </p>
            <p className="text-sm font-medium text-[#69786d]">
              Update crop, acreage, and watering rhythm.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d7e4da] bg-white text-[#405146] transition hover:bg-[#edf5e9]"
            aria-label="Close schedule dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <ScheduleForm
            editId={editId}
            newSchedule={newSchedule}
            onCancel={onCancel}
            onChange={onChange}
            onSubmit={onSubmit}
            variant="dialog"
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleDialog;
