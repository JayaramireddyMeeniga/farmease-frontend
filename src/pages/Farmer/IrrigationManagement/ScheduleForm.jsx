import { Edit3, Plus } from "lucide-react";

const ScheduleForm = ({
  editId,
  newSchedule,
  onChange,
  onSubmit,
  onCancel,
  variant = "card",
}) => {
  const isDialog = variant === "dialog";

  return (
    <section
      className={
        isDialog
          ? "bg-white"
          : "rounded-lg border border-[#dbe9de] bg-white p-5 shadow-[0_18px_50px_rgba(46,70,54,0.10)] sm:p-6"
      }
    >
      {!isDialog && (
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e8f6ec] text-[#227341]">
            {editId ? <Edit3 size={23} /> : <Plus size={24} />}
          </span>
          <div>
            <h2 className="text-xl font-bold text-[#17251e]">
              {editId ? "Edit Schedule" : "Add Schedule"}
            </h2>
            <p className="text-sm font-medium text-[#69786d]">
              Keep crop, area, and watering rhythm precise.
            </p>
          </div>
        </div>
      )}

      <div className={`${isDialog ? "space-y-4" : "mt-6 space-y-4"}`}>
        <label className="block">
          <span className="text-xs font-bold uppercase text-[#506057]">
            Crop
          </span>
          <input
            type="text"
            value={newSchedule.crop}
            onChange={(event) => onChange("crop", event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-[#d7e4da] bg-[#fbfdf9] px-4 text-sm font-semibold text-[#17251e] transition placeholder:text-[#8c9b91] hover:border-[#9dc8af] focus:border-[#2f8f4e]"
            placeholder="Crop name"
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold uppercase text-[#506057]">
            Area
          </span>
          <input
            type="text"
            value={newSchedule.area}
            onChange={(event) => onChange("area", event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-[#d7e4da] bg-[#fbfdf9] px-4 text-sm font-semibold text-[#17251e] transition placeholder:text-[#8c9b91] hover:border-[#9dc8af] focus:border-[#2f8f4e]"
            placeholder="10 acres"
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold uppercase text-[#506057]">
            Schedule
          </span>
          <input
            type="text"
            value={newSchedule.schedule}
            onChange={(event) => onChange("schedule", event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-[#d7e4da] bg-[#fbfdf9] px-4 text-sm font-semibold text-[#17251e] transition placeholder:text-[#8c9b91] hover:border-[#9dc8af] focus:border-[#2f8f4e]"
            placeholder="Every 2 days"
          />
        </label>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={onSubmit}
            className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(34,115,65,0.22)] transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#f0c766] ${editId ? "bg-[#bd8a1f] hover:bg-[#a57617]" : "bg-[#227341] hover:bg-[#1b5f35]"}`}
          >
            {editId ? <Edit3 size={17} /> : <Plus size={18} />}
            {editId ? "Update Schedule" : "Add Schedule"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={onCancel}
              className="h-12 rounded-lg border border-[#d7e4da] bg-white px-5 text-sm font-bold text-[#405146] transition hover:bg-[#f3f8f2]"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScheduleForm;
