import React, { useMemo, useState } from "react";
import BookingConfirmation from "./BookingConfirmation";
import CoolieRateCard from "./CoolieRateCard";
import LaborerList from "./LaborerList";
import SelectedLaborersSummary from "./SelectedLaborersSummary";
import WorkforceHeader from "./WorkforceHeader";
import WorkforceSearchForm from "./WorkforceSearchForm";
import {
  cropMarketRates, defaultWorkTime, mockLaborers, taskTypes,
} from "./workforceData";
import {
  getBaseDailyCoolie, getDaysBetween, getHourlyCoolie, getHoursBetween,
} from "./workforceCalculations";

const FarmLaborMarketplace = () => {
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("Cotton");
  const [marketPrice, setMarketPrice] = useState(8000);
  const [requiredWorkers, setRequiredWorkers] = useState(1);
  const [workTime, setWorkTime] = useState(defaultWorkTime);
  const [taskType, setTaskType] = useState("Harvesting");
  const [workDates, setWorkDates] = useState({ startDate: "", endDate: "" });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLaborers, setSelectedLaborers] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const cropConfig = useMemo(
    () => cropMarketRates.find((item) => item.crop === selectedCrop),
    [selectedCrop],
  );

  const taskConfig = useMemo(
    () => taskTypes.find((task) => task.name === taskType) || taskTypes[0],
    [taskType],
  );

  const baseDailyCoolie = useMemo(
    () => getBaseDailyCoolie({ marketPrice, cropConfig, taskConfig }),
    [cropConfig, marketPrice, taskConfig],
  );

  const hourlyCoolie = useMemo(
    () => getHourlyCoolie(baseDailyCoolie),
    [baseDailyCoolie],
  );

  const hoursPerDay = useMemo(
    () => getHoursBetween(workTime.fromTime, workTime.toTime),
    [workTime],
  );

  const recommendedDailyCoolie = useMemo(
    () => Math.round(hourlyCoolie * hoursPerDay),
    [hourlyCoolie, hoursPerDay],
  );

  const days = useMemo(
    () => getDaysBetween(workDates.startDate, workDates.endDate),
    [workDates],
  );

  const bookingTotal = selectedLaborers.length * recommendedDailyCoolie * days;

  const handleCropChange = (event) => {
    const nextCrop = event.target.value;
    const nextCropConfig = cropMarketRates.find((item) => item.crop === nextCrop);

    setSelectedCrop(nextCrop);
    setMarketPrice(nextCropConfig?.marketPrice || 0);
    setSelectedLaborers([]);
    setSearchResults([]);
  };

  const handleDateChange = (event) => {
    setWorkDates({
      ...workDates,
      [event.target.name]: event.target.value,
    });
  };

  const handleTimeChange = (event) => {
    setWorkTime({
      ...workTime,
      [event.target.name]: event.target.value,
    });
  };

  const searchLaborers = (event) => {
    event.preventDefault();

    const filteredLaborers = mockLaborers.filter(
      (laborer) =>
        laborer.expertise.includes(taskType) && laborer.availability === true,
    );

    setSearchResults([...filteredLaborers].sort((a, b) => b.rating - a.rating));
    setSelectedLaborers([]);
  };

  const toggleLaborerSelection = (laborer) => {
    if (selectedLaborers.some((item) => item.id === laborer.id)) {
      setSelectedLaborers(
        selectedLaborers.filter((item) => item.id !== laborer.id),
      );
      return;
    }

    if (selectedLaborers.length < requiredWorkers) {
      setSelectedLaborers([...selectedLaborers, laborer]);
      return;
    }

    setError(`You can only select up to ${requiredWorkers} laborers`);
    setTimeout(() => setError(""), 3000);
  };

  const bookLaborers = () => {
    if (selectedLaborers.length === 0) {
      setError("Please select at least one laborer");
      return;
    }

    if (!days) {
      setError("Please select the work dates");
      return;
    }

    if (hoursPerDay <= 0) {
      setError("Please select a valid from time and to time");
      return;
    }

    setBookingConfirmed(true);
  };

  const newBooking = () => {
    setSelectedLocation("");
    setSelectedCrop("Cotton");
    setMarketPrice(8000);
    setRequiredWorkers(1);
    setWorkTime(defaultWorkTime);
    setTaskType("Harvesting");
    setWorkDates({ startDate: "", endDate: "" });
    setSearchResults([]);
    setSelectedLaborers([]);
    setBookingConfirmed(false);
    setError("");
  };

  return (
    <div className="min-h-screen py-4 text-slate-900 sm:px-6 lg:px-6">
      <section className="overflow-hidden rounded-lg border border-green-900/10 bg-white shadow-xl shadow-green-900/5">
        <WorkforceHeader
          selectedCrop={selectedCrop} marketPrice={marketPrice}
          cropUnit={cropConfig?.unit} workTime={workTime}
          recommendedDailyCoolie={recommendedDailyCoolie} bookingTotal={bookingTotal}
        />

        {!bookingConfirmed ? (
          <>
            <div className="grid gap-5 border-b border-slate-200 bg-white px-5 py-5 xl:grid-cols-[1.15fr_0.85fr]">
              <WorkforceSearchForm
                selectedLocation={selectedLocation} selectedCrop={selectedCrop}
                marketPrice={marketPrice} cropUnit={cropConfig?.unit}
                taskType={taskType} workTime={workTime} workDates={workDates}
                requiredWorkers={requiredWorkers}
                onLocationChange={(event) =>
                  setSelectedLocation(event.target.value)
                }
                onCropChange={handleCropChange}
                onMarketPriceChange={(event) => setMarketPrice(event.target.value)}
                onTaskChange={(event) => setTaskType(event.target.value)}
                onTimeChange={handleTimeChange} onDateChange={handleDateChange}
                onWorkerCountChange={(event) =>
                  setRequiredWorkers(Number.parseInt(event.target.value, 10))
                }
                onSubmit={searchLaborers}
              />

              <CoolieRateCard
                selectedCrop={selectedCrop} taskType={taskType}
                selectedCount={selectedLaborers.length} requiredWorkers={requiredWorkers}
                days={days} hoursPerDay={hoursPerDay} hourlyCoolie={hourlyCoolie}
                baseDailyCoolie={baseDailyCoolie} recommendedDailyCoolie={recommendedDailyCoolie}
              />
            </div>

            <LaborerList
              error={error} laborers={searchResults}
              selectedLaborers={selectedLaborers}
              recommendedDailyCoolie={recommendedDailyCoolie}
              onToggleLaborer={toggleLaborerSelection}
            />

            <SelectedLaborersSummary
              selectedLaborers={selectedLaborers} requiredWorkers={requiredWorkers}
              days={days} workTime={workTime}
              bookingTotal={bookingTotal} onBookLaborers={bookLaborers}
            />
          </>
        ) : (
          <BookingConfirmation
            selectedCrop={selectedCrop} taskType={taskType}
            selectedLocation={selectedLocation} workDates={workDates}
            workTime={workTime} hoursPerDay={hoursPerDay}
            hourlyCoolie={hourlyCoolie} recommendedDailyCoolie={recommendedDailyCoolie}
            bookingTotal={bookingTotal} selectedLaborers={selectedLaborers}
            onNewBooking={newBooking}
          />
        )}
      </section>
    </div>
  );
};

export default FarmLaborMarketplace;
