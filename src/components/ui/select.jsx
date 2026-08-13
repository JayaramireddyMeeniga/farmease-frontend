import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const getChildOptions = (children) =>
  React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.type === "option")
    .map((child) => ({
      value: child.props.value ?? "",
      label: child.props.children,
      disabled: child.props.disabled,
    }));

const Select = React.forwardRef(
  (
    {
      className,
      error,
      options = [],
      placeholder,
      children,
      value,
      defaultValue,
      onChange,
      disabled,
      name,
      required,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const selectId = React.useId();
    const listboxId = `${selectId}-listbox`;
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue ?? ""
    );
    const wrapperRef = React.useRef(null);

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    React.useEffect(() => {
      const handlePointerDown = (event) => {
        if (!wrapperRef.current?.contains(event.target)) {
          setOpen(false);
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);

      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, []);

    const normalizedOptions = React.useMemo(
      () => [...options, ...getChildOptions(children)],
      [children, options]
    );

    const selectedValue = value ?? internalValue;
    const selectedOption = normalizedOptions.find(
      (option) => String(option.value) === String(selectedValue)
    );
    const displayLabel =
      selectedOption?.label || placeholder || "Choose an option";

    const commitValue = (nextValue) => {
      const event = {
        target: { value: nextValue, name },
        currentTarget: { value: nextValue, name },
      };

      setInternalValue(nextValue);
      onChange?.(event);
    };

    const handleOptionClick = (option) => {
      if (option.disabled) return;

      commitValue(option.value);
      setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (disabled) return;

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    return (
      <div ref={wrapperRef} className={cn("relative w-full", className)}>
        <input
          ref={ref}
          type="hidden"
          name={name}
          value={selectedValue}
          required={required}
          {...props}
        />

        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex min-h-8 w-full items-center gap-3 rounded-md border bg-white px-3 py-1.5 text-left",
            "shadow-[0_10px_24px_rgba(82,55,32,0.08)] transition-all duration-200",
            "hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_16px_32px_rgba(82,55,32,0.13)]",
            "focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-300/30",
            error
              ? "border-red-500 bg-red-50/60 focus-visible:border-red-500 focus-visible:ring-red-500/20"
              : "border-gray-300",
            disabled && "translate-y-0 cursor-not-allowed bg-gray-50 opacity-70 shadow-none"
          )}
        >
          <span className="min-w-0 flex-1">
            <span
              className={cn(
                "block truncate text-sm font-semibold leading-5",
                selectedOption ? "text-[var(--fe-text)]" : "text-gray-500"
              )}
            >
              {displayLabel}
            </span>
          </span>

          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[var(--fe-bg-soft)] text-[var(--fe-primary-700)] transition-all duration-200",
              open && "rotate-180 bg-[var(--fe-primary-100)]"
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>

        {open && !disabled && (
          <div
            id={listboxId}
            role="listbox"
            className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-md border border-gray-300 bg-white py-1 shadow-[0_18px_40px_rgba(82,55,32,0.16)]"
          >
            {normalizedOptions.map((option) => {
              const selected = String(option.value) === String(selectedValue);

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={option.disabled}
                  onClick={() => handleOptionClick(option)}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors",
                    selected
                      ? "bg-green-50 font-semibold text-green-800"
                      : "text-[var(--fe-text)] hover:bg-gray-50",
                    option.disabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">
                    {option.label}
                  </span>
                  {selected && <Check className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
