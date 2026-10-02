import {
  CalendarDays,
  Edit,
  Layers3,
  Plus,
  Route,
  Sprout,
  Trash2,
} from "lucide-react";
import { getCropTone } from "./cropRotationUtils";
import RotationPagination from "./RotationPagination";

const RotationBoard = ({
  currentPage,
  firstVisibleIndex,
  onAdd,
  onDelete,
  onEdit,
  onPageChange,
  rotations,
  totalPages,
  visibleRotations,
}) => {
  const activeRotation = visibleRotations[0];

  return (
    <section className="overflow-hidden rounded-lg border border-[#d8e1dd] bg-[#f8fbf8] shadow-[0_18px_50px_rgba(31,51,42,0.10)]">
      <div className="border-b border-[#dfe9e3] bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#7a6a31]">
              Simple rotation plan
            </p>
            <h2 className="mt-1 text-2xl font-bold text-[#17251e]">
              What to Plant Each Year
            </h2>
            <p className="mt-1 max-w-2xl text-sm font-medium text-[#69786d]">
              Choose a year on the right, then follow the crop order from top
              to bottom.
            </p>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#227341] px-4 text-sm font-bold text-white shadow-[0_12px_24px_rgba(34,115,65,0.22)] transition hover:-translate-y-0.5 hover:bg-[#1b5f35]"
          >
            <Plus size={17} />
            Add Rotation
          </button>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {activeRotation ? (
          <RotationCard
            index={firstVisibleIndex}
            rotation={activeRotation}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ) : (
          <div className="rounded-lg border border-dashed border-[#cfe1d3] bg-[#fbfdf9] p-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#e8f6ec] text-[#227341]">
              <Sprout size={22} />
            </span>
            <p className="mt-3 text-sm font-bold text-[#17251e]">
              No rotations planned yet
            </p>
            <p className="mt-1 text-sm font-medium text-[#69786d]">
              Add a rotation to start building the season pathway.
            </p>
          </div>
        )}

        <RotationPagination
          currentPage={currentPage}
          firstVisibleIndex={firstVisibleIndex}
          onPageChange={onPageChange}
          rotations={rotations}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
};

const RotationCard = ({ index, rotation, onDelete, onEdit }) => {
  return (
    <article className="overflow-hidden rounded-lg border border-[#d8e1dd] bg-white shadow-[0_16px_34px_rgba(31,51,42,0.08)]">
      <div className="border-b border-[#dfe9e3] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-lg bg-[#17251e] px-3 py-1.5 text-xs font-bold uppercase text-[#f0c766]">
              <CalendarDays size={14} />
              Selected cycle {index + 1}
            </span>
            <h3 className="mt-3 truncate text-3xl font-bold text-[#17251e]">
              {rotation.year}
            </h3>
            <p className="mt-2 max-w-2xl text-sm font-medium text-[#69786d]">
              Plant these {rotation.crops.length} crops in this order to help
              protect soil health and reduce repeated pest problems.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(rotation)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#ecd799] bg-[#fff8e6] text-[#9a6a0d] transition hover:bg-[#f0c766] hover:text-[#17251e]"
              aria-label={`Edit ${rotation.year}`}
              title="Edit"
            >
              <Edit size={17} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(rotation.id)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#f2c8bd] bg-[#fff2ef] text-[#bd412d] transition hover:bg-[#bd412d] hover:text-white"
              aria-label={`Delete ${rotation.year}`}
              title="Delete"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="rounded-lg border border-[#e1e9e4] bg-[#fbfdf9] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase text-[#69786d]">
                Planting order
              </p>
              <p className="mt-1 text-sm font-semibold text-[#405146]">
                Start at 1 and continue downward
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#edf4ff] text-[#236299] ring-1 ring-[#bdd8f2]">
              <Route size={18} />
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {rotation.crops.map((crop, cropIndex) => (
              <div
                key={`${rotation.id}-${crop}-${cropIndex}`}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3"
              >
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#227341] ring-1 ring-[#cfe1d3]">
                    {cropIndex + 1}
                  </span>
                  {cropIndex < rotation.crops.length - 1 ? (
                    <span className="mt-2 h-5 w-px bg-[#cfe1d3]" />
                  ) : null}
                </div>
                <div className="min-w-0 rounded-lg border border-[#e3eee5] bg-white p-3">
                  <p className="truncate text-sm font-bold text-[#17251e]">
                    {crop}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#69786d]">
                    {getStageLabel(cropIndex, rotation.crops.length)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-3">
          <SummaryMetric
            icon={Layers3}
            label="Crops this year"
            value={rotation.crops.length}
            tone="amber"
          />
          <SummaryMetric
            icon={Sprout}
            label="Plant first"
            value={rotation.crops[0]}
            tone="green"
          />
          <SummaryMetric
            icon={Route}
            label="Plant last"
            value={rotation.crops[rotation.crops.length - 1]}
            tone="blue"
          />

          <div className="rounded-lg border border-[#e1e9e4] bg-white p-4">
            <p className="text-xs font-bold uppercase text-[#69786d]">
              Crops used
            </p>
            <p className="mt-1 text-xs font-semibold text-[#69786d]">
              These are the crops included in this year.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {rotation.crops.map((crop, cropIndex) => (
                <span
                  key={`${rotation.id}-${crop}-tag-${cropIndex}`}
                  className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${getCropTone(cropIndex)}`}
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
};

const getStageLabel = (index, total) => {
  if (index === 0) {
    return "Plant this first";
  }

  if (index === total - 1) {
    return "Plant this last";
  }

  return "Plant after the previous crop";
};

const metricTones = {
  amber: "bg-[#fff8e6] text-[#8a5a00] ring-[#f4d27a]",
  blue: "bg-[#edf4ff] text-[#236299] ring-[#bdd8f2]",
  green: "bg-[#e8f6ec] text-[#227341] ring-[#bfe2cc]",
};

const SummaryMetric = ({ icon: Icon, label, tone, value }) => (
  <div className="rounded-lg border border-[#e1e9e4] bg-white p-4">
    <div className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 ${metricTones[tone]}`}
      >
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase text-[#69786d]">{label}</p>
        <p className="truncate text-sm font-bold text-[#17251e]">{value}</p>
      </div>
    </div>
  </div>
);

export default RotationBoard;
