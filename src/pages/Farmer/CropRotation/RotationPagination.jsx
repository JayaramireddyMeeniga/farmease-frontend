import {
  ArrowLeft,
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  ListChecks,
} from "lucide-react";

const RotationPagination = ({
  currentPage,
  firstVisibleIndex,
  onPageChange,
  rotations,
  totalPages,
}) => {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;
  const activeRotation = rotations[firstVisibleIndex];

  return (
    <aside className="rounded-lg border border-[#d8e1dd] bg-white p-4 shadow-[0_16px_34px_rgba(31,51,42,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase text-[#69786d]">
            Choose a year
          </p>
          <h3 className="mt-1 text-lg font-bold text-[#17251e]">
            {activeRotation ? activeRotation.year : "No cycles"}
          </h3>
          <p className="mt-1 text-xs font-semibold text-[#69786d]">
            {rotations.length} years planned
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1ecff] text-[#6250a7] ring-1 ring-[#d5c9ff]">
          <ListChecks size={18} />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <NavigationButton
          disabled={!canGoBack}
          label="Previous rotation"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ArrowLeft size={17} />
        </NavigationButton>
        <NavigationButton
          disabled={!canGoForward}
          label="Next rotation"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ArrowRight size={17} />
        </NavigationButton>
      </div>

      <div className="mt-4 rounded-lg border border-[#e3eee5] bg-[#fbfdf9] p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase text-[#69786d]">
            You are viewing
          </span>
          <span className="text-sm font-bold text-[#17251e]">
            Year {currentPage} of {totalPages}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(1.25rem,1fr))] gap-1.5">
          {rotations.map((rotation, index) => {
            const page = index + 1;
            const isActive = currentPage === page;
            const isVisited = page < currentPage;

            return (
              <button
                key={rotation.id}
                type="button"
                onClick={() => onPageChange(page)}
                className={`h-2 rounded-full transition ${
                  isActive
                    ? "bg-[#227341]"
                    : isVisited
                      ? "bg-[#f0c766]"
                      : "bg-[#dbe6df] hover:bg-[#a9d4ba]"
                }`}
                aria-label={`Show ${rotation.year}`}
                aria-current={isActive ? "page" : undefined}
                title={rotation.year}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {rotations.length > 0 ? (
          rotations.map((rotation, index) => {
            const page = index + 1;
            const isActive = currentPage === page;

            return (
              <button
                key={rotation.id}
                type="button"
                onClick={() => onPageChange(page)}
                className={`w-full rounded-lg border p-3 text-left transition ${
                  isActive
                    ? "border-[#227341] bg-[#e8f6ec] shadow-[0_10px_22px_rgba(34,115,65,0.15)]"
                    : "border-[#e3eee5] bg-white hover:border-[#a9d4ba] hover:bg-[#fbfdf9]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      isActive
                        ? "bg-[#227341] text-white"
                        : "bg-[#f4f7f5] text-[#405146] ring-1 ring-[#dbe6df]"
                    }`}
                  >
                    {page}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-bold text-[#17251e]">
                        {rotation.year}
                      </span>
                      {isActive ? (
                        <CheckCircle2
                          size={16}
                          className="shrink-0 text-[#227341]"
                        />
                      ) : null}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 text-xs font-bold text-[#405146]">
                      <CalendarRange size={13} />
                      {rotation.crops.length} crops to plant
                    </span>
                    <span className="mt-1 block truncate text-xs font-semibold text-[#69786d]">
                      Order: {rotation.crops.join(" -> ")}
                    </span>
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <p className="rounded-lg border border-dashed border-[#cfe1d3] bg-[#fbfdf9] p-3 text-sm font-semibold text-[#69786d]">
            Add cycles to use the navigator.
          </p>
        )}
      </div>
    </aside>
  );
};

const NavigationButton = ({ children, disabled, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="flex h-10 items-center justify-center rounded-lg border border-[#d7e4da] bg-[#fbfdf9] text-[#405146] transition hover:-translate-y-0.5 hover:border-[#9dc8af] hover:bg-[#edf5e9] hover:text-[#227341] disabled:cursor-not-allowed disabled:border-[#e4ece6] disabled:bg-[#f7faf8] disabled:text-[#b1bdb5] disabled:hover:translate-y-0"
    aria-label={label}
    title={label}
  >
    {children}
  </button>
);

export default RotationPagination;
