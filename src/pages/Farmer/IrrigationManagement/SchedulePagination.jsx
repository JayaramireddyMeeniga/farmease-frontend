import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);

  const visiblePages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return visiblePages.flatMap((page, index) => {
    const previousPage = visiblePages[index - 1];

    if (index > 0 && page - previousPage > 1) {
      return [`ellipsis-${previousPage}-${page}`, page];
    }

    return [page];
  });
};

const SchedulePagination = ({
  currentPage,
  currentSchedulesCount,
  filteredCount,
  onPageChange,
  totalPages,
}) => {
  const paginationItems = getPaginationItems(currentPage, totalPages);
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  return (
    <div className="border-t border-[#e3eee5] bg-white px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 rounded-lg border border-[#d7e4da] bg-[#fbfdf9] p-3 shadow-[0_10px_24px_rgba(46,70,54,0.07)] lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-semibold text-[#69786d]">
          Showing{" "}
          <span className="font-bold text-[#17251e]">
            {currentSchedulesCount}
          </span>{" "}
          of{" "}
          <span className="font-bold text-[#17251e]">{filteredCount}</span>{" "}
          schedules
        </p>

        <nav
          aria-label="Irrigation schedule pages"
          className="flex items-center gap-2 overflow-x-auto"
        >
          <PaginationIconButton
            disabled={!canGoBack}
            label="First page"
            onClick={() => onPageChange(1)}
          >
            <ChevronsLeft size={17} />
          </PaginationIconButton>

          <PaginationIconButton
            disabled={!canGoBack}
            label="Previous page"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft size={17} />
          </PaginationIconButton>

          <div className="flex items-center gap-1 rounded-lg border border-[#d7e4da] bg-white p-1">
            {paginationItems.map((item) =>
              typeof item === "number" ? (
                <PaginationPageButton
                  isActive={currentPage === item}
                  key={item}
                  onClick={() => onPageChange(item)}
                  page={item}
                />
              ) : (
                <span
                  key={item}
                  className="flex h-9 w-9 items-center justify-center text-[#819086]"
                  aria-hidden="true"
                >
                  <MoreHorizontal size={17} />
                </span>
              ),
            )}
          </div>

          <PaginationIconButton
            disabled={!canGoForward}
            label="Next page"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight size={17} />
          </PaginationIconButton>

          <PaginationIconButton
            disabled={!canGoForward}
            label="Last page"
            onClick={() => onPageChange(totalPages)}
          >
            <ChevronsRight size={17} />
          </PaginationIconButton>
        </nav>

        <span className="w-fit rounded-lg bg-[#e8f6ec] px-3 py-2 text-sm font-bold text-[#227341] ring-1 ring-[#c7e5cf]">
          Page {currentPage} / {totalPages}
        </span>
      </div>
    </div>
  );
};

const PaginationIconButton = ({ children, disabled, label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#d7e4da] bg-white text-[#405146] transition hover:-translate-y-0.5 hover:border-[#9dc8af] hover:bg-[#edf5e9] hover:text-[#227341] disabled:cursor-not-allowed disabled:border-[#e4ece6] disabled:bg-[#f7faf8] disabled:text-[#b1bdb5] disabled:hover:translate-y-0"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
};

const PaginationPageButton = ({ isActive, onClick, page }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 min-w-9 shrink-0 rounded-md px-3 text-sm font-bold transition ${isActive
        ? "bg-[#227341] text-white shadow-[0_8px_18px_rgba(34,115,65,0.24)]"
        : "text-[#405146] hover:bg-[#edf5e9] hover:text-[#227341]"
        }`}
      aria-current={isActive ? "page" : undefined}
      aria-label={`Go to page ${page}`}
    >
      {page}
    </button>
  );
};

export default SchedulePagination;
