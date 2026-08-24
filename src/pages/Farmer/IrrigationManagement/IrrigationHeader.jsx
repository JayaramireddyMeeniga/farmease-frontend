import { CheckCircle2, Waves } from "lucide-react";
import { getScheduleTone } from "./irrigationUtils";

const IrrigationHeader = ({ stats, focusSchedules }) => {
  return (
    <header className="overflow-hidden rounded-lg border border-[#d7e6df] bg-[#10251f] text-white shadow-[0_14px_36px_rgba(16,37,31,0.16)]">
      <div className="grid gap-3 p-3 sm:p-4 lg:grid-cols-[1fr_0.95fr]">
        <div className="flex min-w-0 flex-col gap-3">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[#d7f8e4]">
              <Waves size={13} />
              Smart water planning
            </span>
            <h1 className="mt-2 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl">
              Irrigation Management
            </h1>
            <p className="mt-1.5 max-w-2xl text-xs leading-5 text-[#cfe0d6] sm:text-sm">
              Plan crop watering cycles, track acreage, and keep every field on
              a clear schedule from one polished workspace.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {stats.map(({ label, value, detail, icon: Icon }) => (
              <div
                key={label}
                className="rounded-lg border border-white/12 bg-white/[0.07] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-semibold uppercase text-[#9fc9b1]">
                    {label}
                  </p>
                  <Icon size={14} className="text-[#f0c766]" />
                </div>
                <p className="mt-1.5 text-lg font-bold text-white">{value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-[#bfd0c6]">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#d3efe0]/20 bg-[#f7fbf6] p-3 text-[#17251e] shadow-[0_10px_26px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dff4e8] text-[#227341]">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <p className="text-sm font-bold leading-5 text-[#17251e]">
                Today&apos;s focus
              </p>
              <p className="text-[11px] font-medium text-[#69786d]">
                Prioritize frequent watering zones.
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {focusSchedules.map((schedule) => {
              const tone = getScheduleTone(schedule.schedule);

              return (
                <div
                  key={schedule.id}
                  className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-[#ddebe2] bg-white px-2.5 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold">
                      {schedule.crop}
                    </p>
                    <p className="text-[11px] font-semibold text-[#69786d]">
                      {schedule.area}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${tone.className}`}
                  >
                    {tone.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default IrrigationHeader;
