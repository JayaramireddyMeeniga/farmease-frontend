import { Edit3, Plus, Sprout, Trash2 } from "lucide-react";
import { getCropTone } from "./cropRotationUtils";

const RotationBoard = ({ rotations, onAdd, onDelete, onEdit }) => {
  return (
    <section className="rounded-lg border border-[#dbe9de] bg-white shadow-[0_18px_50px_rgba(46,70,54,0.10)]">
      <div className="border-b border-[#e3eee5] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#17251e]">
              Current Rotations
            </h2>
            <p className="mt-1 max-w-2xl text-sm font-medium text-[#69786d]">
              Use this planner to organize and manage crop rotations
              effectively across growing seasons.
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

      <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
        {rotations.map((rotation, index) => (
          <RotationCard
            key={rotation.id}
            index={index}
            rotation={rotation}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </section>
  );
};

const RotationCard = ({ index, rotation, onDelete, onEdit }) => {
  return (
    <article className="group rounded-lg border border-[#dbe9de] bg-[#fbfdf9] p-4 transition hover:-translate-y-1 hover:border-[#a9d4ba] hover:shadow-[0_18px_38px_rgba(46,70,54,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#e8f6ec] text-[#227341] transition group-hover:bg-[#227341] group-hover:text-white">
            <Sprout size={20} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-[#69786d]">
              Cycle {index + 1}
            </p>
            <h3 className="truncate text-lg font-bold text-[#17251e]">
              {rotation.year}
            </h3>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(rotation)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ecd799] bg-[#fff8e6] text-[#9a6a0d] transition hover:bg-[#f0c766] hover:text-[#17251e]"
            aria-label={`Edit ${rotation.year}`}
            title="Edit"
          >
            <Edit3 size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(rotation.id)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#f2c8bd] bg-[#fff2ef] text-[#bd412d] transition hover:bg-[#bd412d] hover:text-white"
            aria-label={`Delete ${rotation.year}`}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {rotation.crops.map((crop, cropIndex) => (
          <span
            key={`${rotation.id}-${crop}-${cropIndex}`}
            className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${getCropTone(cropIndex)}`}
          >
            {crop}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-[#e3eee5] bg-white px-3 py-2">
        <p className="text-[11px] font-bold uppercase text-[#69786d]">
          Sequence
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-[#405146]">
          {rotation.crops.join(" -> ")}
        </p>
      </div>
    </article>
  );
};

export default RotationBoard;
