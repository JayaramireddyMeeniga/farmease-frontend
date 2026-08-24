import { CheckCircle2, Waves } from "lucide-react";
import { getScheduleTone } from "./irrigationUtils";

const IrrigationHeader = ({ stats, focusSchedules }) => {
  return (
    <header className="overflow-hidden rounded-lg border border-[#d7e6df] bg-[#10251f] text-white shadow-[0_24px_70px_rgba(16,37,31,0.22)]">
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.35fr_0.65fr] lg:p-8">
        <div className="flex min-w-0 flex-col justify-between gap-7">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase text-[#d7f8e4]">
              <Waves size={15} />
              Smart water planning
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Irrigation Management
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#cfe0d6] sm:text-base">
              Plan crop watering cycles, track acreage, and keep every field on
              a clear schedule from one polished workspace.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map(({ label, value, detail, icon: Icon }) => (
              <div
                key={label}
                className="rounded-lg border border-white/12 bg-white/[0.07] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase text-[#9fc9b1]">
                    {label}
                  </p>
                  <Icon size={18} className="text-[#f0c766]" />
                </div>
                <p className="mt-3 text-2xl font-bold text-white">{value}</p>
                <p className="mt-1 text-xs font-medium text-[#bfd0c6]">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#d3efe0]/20 bg-[#f7fbf6] p-5 text-[#17251e] shadow-[0_18px_46px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#dff4e8] text-[#227341]">
              <CheckCircle2 size={23} />
            </span>
            <div>
              <p className="text-sm font-bold text-[#17251e]">
                Today&apos;s focus
              </p>
              <p className="text-xs font-medium text-[#69786d]">
                Prioritize frequent watering zones.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {focusSchedules.map((schedule) => {
              const tone = getScheduleTone(schedule.schedule);

              return (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#ddebe2] bg-white px-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      {schedule.crop}
                    </p>
                    <p className="text-xs font-semibold text-[#69786d]">
                      {schedule.area}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${tone.className}`}
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
