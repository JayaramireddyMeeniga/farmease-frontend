import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HeaderSearchInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search crops, orders, tools...",
}) => {
  return (
    <form onSubmit={onSubmit} className="relative w-full gap-2">
      <span className="pointer-events-none absolute left-1 top-1/2 flex p-2 -translate-y-1/2 items-center justify-center text-[#2f7d5a]">
        <FontAwesomeIcon icon={faSearch} className="text-sm" />
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#dfebdc] bg-white/90 py-2.5 pl-9 text-sm font-semibold text-[#17251e] shadow-[0_12px_32px_rgba(38,50,37,0.08)] transition placeholder:text-[#7a887e] hover:border-[#b7d3b3] focus:border-[#2f7d5a] focus:bg-white"
      />
    </form>
  );
};

export default HeaderSearchInput;
