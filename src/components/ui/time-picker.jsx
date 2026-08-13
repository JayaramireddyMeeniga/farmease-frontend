import * as React from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent } from "./dialog";
import { motion } from "framer-motion";

const TimePicker = ({ value, onChange, label = "Select Time" }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hour, setHour] = React.useState(0);
  const [minute, setMinute] = React.useState(0);
  const [isAM, setIsAM] = React.useState(true);
  const [is24Mode, setIs24Mode] = React.useState(false);

  React.useEffect(() => {
    if (!value) return;

    const is24 = /^[0-9]{2}:[0-9]{2}$/.test(value);
    setIs24Mode(is24);

    if (is24) {
      const [h, m] = value.split(":");
      setHour(Number(h));
      setMinute(Number(m));
      return;
    }

    const [time, period] = value.split(" ");
    const [h, m] = time.split(":");

    setIsAM(period === "AM");
    setHour(Number(h));
    setMinute(Number(m));
  }, [value]);

  const handleSave = () => {
    const formatted = `${String(hour).padStart(2, "0")}:${String(
      minute,
    ).padStart(2, "0")}`;

    onChange(formatted + (is24Mode ? "" : ` ${isAM ? "AM" : "PM"}`));
    setIsOpen(false);
  };

  const hours = is24Mode
    ? [...Array(24).keys()]
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group mt-0.5 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-all duration-200 hover:border-brand-blue hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-blue/10"
      >
        <span
          className={`text-sm font-medium ${
            value ? "text-gray-800" : "text-gray-400"
          }`}
        >
          {value || label}
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white">
          <Clock className="h-4 w-4" />
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md rounded-3xl border border-gray-100 bg-white p-0 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-3xl"
          >
            <div className="bg-gradient-to-br from-brand-blue to-brand-blue/80 px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                  <Clock className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">{label}</h2>
                  <p className="text-xs text-white/80">
                    Choose hour and minute
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white/15 px-4 py-4 text-center backdrop-blur">
                <span className="text-4xl font-bold tracking-wide">
                  {String(hour).padStart(2, "0")}:
                  {String(minute).padStart(2, "0")}
                </span>

                {!is24Mode && (
                  <span className="ml-2 text-xl font-semibold">
                    {isAM ? "AM" : "PM"}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">Hour</p>

                <div className="grid grid-cols-6 gap-2">
                  {hours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHour(h)}
                      className={`rounded-xl px-2 py-2 text-sm font-semibold transition-all duration-200 ${
                        hour === h
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                          : "bg-gray-50 text-gray-600 hover:bg-brand-blue/10 hover:text-brand-blue"
                      }`}
                    >
                      {String(h).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Minute
                </p>

                <div className="grid grid-cols-6 gap-2">
                  {minutes.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMinute(m)}
                      className={`rounded-xl px-2 py-2 text-sm font-semibold transition-all duration-200 ${
                        minute === m
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                          : "bg-gray-50 text-gray-600 hover:bg-brand-blue/10 hover:text-brand-blue"
                      }`}
                    >
                      {String(m).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              {!is24Mode && (
                <div className="grid grid-cols-2 gap-3 rounded-2xl bg-gray-50 p-1.5">
                  <button
                    type="button"
                    onClick={() => setIsAM(true)}
                    className={`rounded-xl py-2 text-sm font-bold transition ${
                      isAM
                        ? "bg-white text-brand-blue shadow-sm"
                        : "text-gray-500 hover:text-brand-blue"
                    }`}
                  >
                    AM
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAM(false)}
                    className={`rounded-xl py-2 text-sm font-bold transition ${
                      !isAM
                        ? "bg-white text-brand-blue shadow-sm"
                        : "text-gray-500 hover:text-brand-blue"
                    }`}
                  >
                    PM
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-blue/20 transition hover:bg-brand-blue/90"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  OK
                </button>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimePicker;

export const to24HourFormat = (time) => {
  if (!time) return "";

  const [hmin, period] = time.split(" ");
  let [h, m] = hmin.split(":").map(Number);

  if (period === "PM" && h < 12) h += 12;
  if (period === "AM" && h === 12) h = 0;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};
