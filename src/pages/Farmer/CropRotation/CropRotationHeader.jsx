import { BarChart3, Leaf, Repeat2, ShieldCheck, Sprout } from "lucide-react";
import ModuleHeader from "../../../components/ui/ModuleHeader";
import { plannerBenefits } from "./cropRotationData";

const statIcons = [Repeat2, Sprout, BarChart3];

const CropRotationHeader = ({ summary }) => {
  const stats = [
    {
      label: "Rotation years",
      value: summary.totalYears,
      detail: "Planned cycles",
    },
    {
      label: "Crop stages",
      value: summary.totalCrops,
      detail: "Across all years",
    },
    {
      label: "Crop diversity",
      value: summary.uniqueCrops,
      detail: "Unique crops",
    },
  ];

  return (
    <ModuleHeader
      title="Crop Rotation Planner"
      description="Crop rotation helps improve soil health, reduce pests, and increase crop yield by organizing crops across growing seasons."
      badge="Soil-first planning"
      badgeIcon={Leaf}
      className="border border-[#d7e6df] shadow-[0_14px_36px_rgba(16,37,31,0.16)]"
      sideContent={
        <div className="rounded-lg border border-[#d3efe0]/20 bg-[#f7fbf6] p-3 text-[#17251e] shadow-[0_10px_26px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dff4e8] text-[#227341]">
              <ShieldCheck size={18} />
            </span>
            <div>
              <p className="text-sm font-bold leading-5 text-[#17251e]">
                Rotation impact
              </p>
              <p className="text-[11px] font-medium text-[#69786d]">
                Cleaner seasons with less soil fatigue.
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {plannerBenefits.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-[#ddebe2] bg-white px-2.5 py-2"
              >
                <p className="text-[10px] font-bold uppercase text-[#69786d]">
                  {item.title}
                </p>
                <p className="mt-1 text-xs font-bold text-[#17251e]">
                  {item.value}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#69786d]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {stats.map(({ label, value, detail }, index) => {
          const Icon = statIcons[index];

          return (
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
          );
        })}
      </div>
    </ModuleHeader>
  );
};

export default CropRotationHeader;
