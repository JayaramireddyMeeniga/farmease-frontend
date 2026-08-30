import React from "react";

const ModuleHeader = ({
  title,
  description,
  badge,
  badgeIcon: BadgeIcon,
  action,
  actionIcon: ActionIcon,
  children,
  sideContent,
  className = "",
  contentClassName = "",
}) => (
  <header
    className={`overflow-hidden rounded-lg border border-[#d7e6df] bg-[#285448] p-5 text-white shadow-[0_14px_36px_rgba(16,37,31,0.16)] ${className}`}
  >
    <div
      className={`flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between ${contentClassName}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold leading-tight">{title}</h1>

              {badge && (
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-sm font-medium text-green-50 ring-1 ring-white/20">
                  {BadgeIcon && <BadgeIcon className="h-4 w-4" />}
                  {badge}
                </div>
              )}
            </div>

            {description && (
              <p className="mt-1 max-w-xl text-sm leading-6 text-green-50/90">
                {description}
              </p>
            )}
          </div>

          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-green-800 shadow-lg shadow-green-950/20 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              {ActionIcon && <ActionIcon className="h-4 w-4" />}
              {action.label}
            </button>
          )}
        </div>

        {children}
      </div>

      {sideContent && <div className="w-full lg:max-w-xl">{sideContent}</div>}
    </div>
  </header>
);

export default ModuleHeader;
