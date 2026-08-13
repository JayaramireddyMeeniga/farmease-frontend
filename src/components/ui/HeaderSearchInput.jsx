import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HeaderSearchInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search across FarmEase...",
}) => {
  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-md">
      <span className="pointer-events-none absolute left-3 top-1/2 flex py-2 px-1.5 -translate-y-1/2 items-center justify-center rounded-full bg-[#f3eadc] text-[#8f6a46]">
        <FontAwesomeIcon icon={faSearch} className="text-xs" />
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm border border-[#d6c1a3] bg-[#fffaf2] py-2 pl-12 pr-4 text-sm font-medium text-[var(--fe-text)] shadow-[0_12px_30px_rgba(111,78,55,0.12)] transition placeholder:text-[#8a7a68] hover:border-[#c49b63] hover:bg-white focus:border-[#8f6a46] focus:bg-white"
      />
    </form>
  );
};

export default HeaderSearchInput;
