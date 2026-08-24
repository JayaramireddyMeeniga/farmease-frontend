import { Droplets, Edit3, Filter, Leaf, Plus, Search, Trash2 } from "lucide-react";
import { getScheduleTone } from "./irrigationUtils";

const ScheduleList = ({
  areaOptions,
  currentPage,
  currentSchedules,
  filteredCount,
  filterArea,
  onDelete,
  onEdit,
  onOpenAdd,
  onFilterChange,
  onPageChange,
  onSearchChange,
  searchQuery,
  totalPages,
}) => {
  return (
    <section className="rounded-lg border border-[#dbe9de] bg-white shadow-[0_18px_50px_rgba(46,70,54,0.10)]">
      <div className="border-b border-[#e3eee5] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#17251e]">
              Current Schedules
            </h2>
            <p className="mt-1 text-sm font-medium text-[#69786d]">
              Browse, filter, and maintain all irrigation plans.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem_auto] lg:w-[44rem]">
            <label className="relative block">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#728178]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                className="h-11 w-full rounded-lg border border-[#d7e4da] bg-[#fbfdf9] pl-10 pr-3 text-sm font-semibold transition placeholder:text-[#8c9b91] hover:border-[#9dc8af] focus:border-[#2f8f4e]"
                placeholder="Search crop"
              />
            </label>

            <label className="relative block">
              <Filter
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#728178]"
              />
              <select
                value={filterArea}
                onChange={(event) => onFilterChange(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-[#d7e4da] bg-[#fbfdf9] pl-10 pr-3 text-sm font-bold text-[#25352c] transition hover:border-[#9dc8af] focus:border-[#2f8f4e]"
              >
                <option value="">All areas</option>
                {areaOptions.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={onOpenAdd}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#227341] px-4 text-sm font-bold text-white shadow-[0_12px_24px_rgba(34,115,65,0.22)] transition hover:-translate-y-0.5 hover:bg-[#1b5f35]"
            >
              <Plus size={17} />
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-170 text-left">
          <thead>
            <tr className="border-b border-[#e3eee5] bg-[#f7fbf6] text-xs font-bold uppercase text-[#627067]">
              <th className="px-5 py-4">Crop</th>
              <th className="px-5 py-4">Area</th>
              <th className="px-5 py-4">Schedule</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3ee]">
            {currentSchedules.map((schedule) => (
              <ScheduleTableRow
                key={schedule.id}
                schedule={schedule}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {currentSchedules.map((schedule) => (
          <ScheduleMobileCard
            key={schedule.id}
            schedule={schedule}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {currentSchedules.length === 0 && <EmptySchedules />}

      <div className="flex flex-col gap-3 border-t border-[#e3eee5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-[#69786d]">
          Showing {currentSchedules.length} of {filteredCount}
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              type="button"
              onClick={() => onPageChange(i + 1)}
              className={`h-10 min-w-10 rounded-lg px-3 text-sm font-bold transition ${currentPage === i + 1 ? "bg-[#227341] text-white shadow-[0_10px_22px_rgba(34,115,65,0.22)]" : "border border-[#d7e4da] bg-white text-[#405146] hover:bg-[#edf5e9] hover:text-[#227341]"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScheduleTableRow = ({ schedule, onDelete, onEdit }) => {
  const tone = getScheduleTone(schedule.schedule);

  return (
    <tr className="group transition hover:bg-[#f7fbf6]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f6ec] text-[#227341] transition group-hover:bg-[#227341] group-hover:text-white">
            <Leaf size={18} />
          </span>
          <span className="font-bold text-[#17251e]">{schedule.crop}</span>
        </div>
      </td>
      <td className="px-5 py-4 text-sm font-semibold text-[#506057]">
        {schedule.area}
      </td>
      <td className="px-5 py-4 text-sm font-semibold text-[#506057]">
        {schedule.schedule}
      </td>
      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${tone.className}`}
        >
          {tone.label}
        </span>
      </td>
      <td className="px-5 py-4">
        <ScheduleActions schedule={schedule} onDelete={onDelete} onEdit={onEdit} />
      </td>
    </tr>
  );
};

const ScheduleMobileCard = ({ schedule, onDelete, onEdit }) => {
  const tone = getScheduleTone(schedule.schedule);

  return (
    <article className="rounded-lg border border-[#dbe9de] bg-[#fbfdf9] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-[#17251e]">
            {schedule.crop}
          </p>
          <p className="mt-1 text-sm font-semibold text-[#69786d]">
            {schedule.area} - {schedule.schedule}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${tone.className}`}
        >
          {tone.label}
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(schedule)}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-[#ecd799] bg-[#fff8e6] text-sm font-bold text-[#9a6a0d] transition hover:bg-[#f0c766] hover:text-[#17251e]"
        >
          <Edit3 size={16} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(schedule.id)}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-[#f2c8bd] bg-[#fff2ef] text-sm font-bold text-[#bd412d] transition hover:bg-[#bd412d] hover:text-white"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </article>
  );
};

const ScheduleActions = ({ schedule, onDelete, onEdit }) => {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={() => onEdit(schedule)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ecd799] bg-[#fff8e6] text-[#9a6a0d] transition hover:-translate-y-0.5 hover:bg-[#f0c766] hover:text-[#17251e]"
        aria-label={`Edit ${schedule.crop} schedule`}
        title="Edit"
      >
        <Edit3 size={16} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(schedule.id)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#f2c8bd] bg-[#fff2ef] text-[#bd412d] transition hover:-translate-y-0.5 hover:bg-[#bd412d] hover:text-white"
        aria-label={`Delete ${schedule.crop} schedule`}
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

const EmptySchedules = () => {
  return (
    <div className="px-6 py-12 text-center">
      <Droplets className="mx-auto h-10 w-10 text-[#9bb7a6]" />
      <p className="mt-3 text-base font-bold text-[#17251e]">
        No schedules found
      </p>
      <p className="mt-1 text-sm font-medium text-[#69786d]">
        Try a different crop search or area filter.
      </p>
    </div>
  );
};

export default ScheduleList;
