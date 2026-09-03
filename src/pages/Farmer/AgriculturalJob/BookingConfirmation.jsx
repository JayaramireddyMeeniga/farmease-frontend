import React from "react";
import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { formatCurrency, formatHours } from "./workforceCalculations";

const BookingConfirmation = ({
  selectedCrop, taskType, selectedLocation, workDates, workTime, hoursPerDay,
  hourlyCoolie, recommendedDailyCoolie, bookingTotal, selectedLaborers, onNewBooking,
}) => (
  <div className="bg-slate-50/80 px-5 py-8">
    <div className="mx-auto max-w-3xl rounded-lg border border-green-100 bg-white p-6 shadow-lg shadow-green-900/5">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          Booking Confirmed
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Notifications have been sent to all selected laborers.
        </p>
      </div>

      <div className="mt-6 grid gap-3 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-2">
        <p>
          <span className="font-semibold text-slate-700">Crop:</span>{" "}
          {selectedCrop}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Task:</span>{" "}
          {taskType}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Location:</span>{" "}
          {selectedLocation}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Work:</span>{" "}
          {workDates.startDate} to {workDates.endDate}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Time:</span>{" "}
          {workTime.fromTime} to {workTime.toTime}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Hours:</span>{" "}
          {formatHours(hoursPerDay)} hrs / day
        </p>
        <p>
          <span className="font-semibold text-slate-700">Hourly coolie:</span>{" "}
          {formatCurrency(hourlyCoolie)}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Daily coolie:</span>{" "}
          {formatCurrency(recommendedDailyCoolie)}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Total:</span>{" "}
          {formatCurrency(bookingTotal)}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {selectedLaborers.map((laborer) => (
          <div
            key={laborer.id}
            className="rounded-lg border border-slate-200 p-4"
          >
            <h3 className="font-semibold text-slate-900">{laborer.name}</h3>
            <p className="mt-1 text-sm text-slate-500">
              Phone: {laborer.phone}
            </p>
            <p className="mt-2 text-sm font-semibold text-green-800">
              {formatCurrency(recommendedDailyCoolie)} / day
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onNewBooking}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          <BriefcaseBusiness className="h-4 w-4" />
          Create New Booking
        </button>
      </div>
    </div>
  </div>
);

export default BookingConfirmation;
