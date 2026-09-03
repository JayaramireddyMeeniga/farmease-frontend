import React from "react";
import { Search } from "lucide-react";
import { DateInput } from "../../../components/ui/date-input";
import { Select } from "../../../components/ui/select";
import { TimeInput } from "../../../components/ui/time-input";
import { availableLocations, cropMarketRates, taskTypes } from "./workforceData";

const locationOptions = availableLocations.map((location) => ({
  value: location,
  label: location,
}));

const cropOptions = cropMarketRates.map((item) => ({
  value: item.crop,
  label: item.crop,
}));

const taskOptions = taskTypes.map((task) => ({
  value: task.name,
  label: task.name,
}));

const WorkforceSearchForm = ({
  selectedLocation, selectedCrop, marketPrice, cropUnit, taskType, workTime, workDates, requiredWorkers, onLocationChange,
  onCropChange, onMarketPriceChange, onTaskChange, onTimeChange, onDateChange, onWorkerCountChange, onSubmit,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="flex items-center gap-2">
      <Search className="h-5 w-5 text-green-700" />
      <h2 className="text-lg font-semibold text-slate-900">Find laborers</h2>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Location</span>
        <Select
          value={selectedLocation} onChange={onLocationChange} options={locationOptions}
          placeholder="Select a location" className="mt-2" aria-label="Location" required
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Crop</span>
        <Select
          value={selectedCrop} onChange={onCropChange} options={cropOptions} className="mt-2" aria-label="Crop"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">
          Today market price / {cropUnit}
        </span>
        <input
          type="number" min="0" value={marketPrice} onChange={onMarketPriceChange}
          className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
          aria-label="Market price"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Task type</span>
        <Select
          value={taskType} onChange={onTaskChange} options={taskOptions}
          className="mt-2" aria-label="Task type"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">From time</span>
        <TimeInput
          name="fromTime" value={workTime.fromTime} onChange={onTimeChange} className="mt-2" required
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">To time</span>
        <TimeInput
          name="toTime" value={workTime.toTime} onChange={onTimeChange} className="mt-2" required
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Start date
          </span>
          <DateInput
            name="startDate" value={workDates.startDate} onChange={onDateChange} className="mt-2" required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">End date</span>
          <DateInput
            name="endDate" value={workDates.endDate} onChange={onDateChange} className="mt-2" required
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">
          Number of workers
        </span>
        <input
          type="number" min="1" max="10" value={requiredWorkers} onChange={onWorkerCountChange}
          className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
        />
      </label>
    </div>

    <button type="submit"
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-semibold text-white shadow-md shadow-green-900/15 transition hover:bg-green-800"
    >
      <Search className="h-4 w-4" />
      Search Available Laborers
    </button>
  </form>
);

export default WorkforceSearchForm;
