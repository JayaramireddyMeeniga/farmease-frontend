import React, { useMemo, useState } from "react";
import { CalendarClock, Droplets, Sprout } from "lucide-react";
import IrrigationHeader from "./IrrigationHeader";
import ScheduleForm from "./ScheduleForm";
import ScheduleList from "./ScheduleList";
import { initialSchedules } from "./irrigationData";
import { getAreaValue, getIntervalDays } from "./irrigationUtils";

const emptySchedule = {
  crop: "",
  area: "",
  schedule: "",
};

const itemsPerPage = 6;

const IrrigationManagement = () => {
  const [irrigationSchedules, setIrrigationSchedules] =
    useState(initialSchedules);
  const [newSchedule, setNewSchedule] = useState(emptySchedule);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterArea, setFilterArea] = useState("");

  const areaOptions = useMemo(
    () =>
      [...new Set(irrigationSchedules.map((schedule) => schedule.area))].sort(
        (a, b) => getAreaValue(a) - getAreaValue(b),
      ),
    [irrigationSchedules],
  );

  const totalArea = useMemo(
    () =>
      irrigationSchedules.reduce(
        (sum, schedule) => sum + getAreaValue(schedule.area),
        0,
      ),
    [irrigationSchedules],
  );

  const dailyWateringCount = useMemo(
    () =>
      irrigationSchedules.filter(
        (schedule) => getIntervalDays(schedule.schedule) <= 1,
      ).length,
    [irrigationSchedules],
  );

  const filteredSchedules = irrigationSchedules.filter((schedule) => {
    const matchesSearch = schedule.crop
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterArea ? schedule.area === filterArea : true;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSchedules.length / itemsPerPage),
  );
  const safePage = Math.min(currentPage, totalPages);
  const indexOfLastItem = safePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSchedules = filteredSchedules.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const stats = [
    {
      label: "Active schedules",
      value: irrigationSchedules.length,
      detail: `${filteredSchedules.length} matching view`,
      icon: CalendarClock,
    },
    {
      label: "Managed area",
      value: `${totalArea} ac`,
      detail: "Across planned crops",
      icon: Sprout,
    },
    {
      label: "Daily cycles",
      value: dailyWateringCount,
      detail: "Need close monitoring",
      icon: Droplets,
    },
  ];

  const resetForm = () => {
    setNewSchedule(emptySchedule);
    setEditId(null);
  };

  const updateFormField = (field, value) => {
    setNewSchedule((schedule) => ({ ...schedule, [field]: value }));
  };

  const addSchedule = () => {
    if (!newSchedule.crop || !newSchedule.area || !newSchedule.schedule) {
      alert("Please fill in all fields.");
      return;
    }

    if (editId) {
      setIrrigationSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === editId ? { ...schedule, ...newSchedule } : schedule,
        ),
      );
    } else {
      const nextId =
        irrigationSchedules.length > 0
          ? Math.max(...irrigationSchedules.map((schedule) => schedule.id)) + 1
          : 1;

      setIrrigationSchedules((prev) => [
        ...prev,
        { id: nextId, ...newSchedule },
      ]);
    }

    resetForm();
    setCurrentPage(1);
  };

  const editSchedule = (schedule) => {
    setNewSchedule({
      crop: schedule.crop,
      area: schedule.area,
      schedule: schedule.schedule,
    });
    setEditId(schedule.id);
  };

  const deleteSchedule = (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      setIrrigationSchedules((prev) =>
        prev.filter((schedule) => schedule.id !== id),
      );
    }
  };

  const updateSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const updateFilter = (value) => {
    setFilterArea(value);
    setCurrentPage(1);
  };

  return (
    <section className="min-h-screen bg-[#eef5f7] px-4 py-5 text-[#17251e] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <IrrigationHeader
          focusSchedules={irrigationSchedules.slice(0, 3)}
          stats={stats}
        />

        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <ScheduleForm
            editId={editId}
            newSchedule={newSchedule}
            onCancel={resetForm}
            onChange={updateFormField}
            onSubmit={addSchedule}
          />

          <ScheduleList
            areaOptions={areaOptions}
            currentPage={safePage}
            currentSchedules={currentSchedules}
            filteredCount={filteredSchedules.length}
            filterArea={filterArea}
            onDelete={deleteSchedule}
            onEdit={editSchedule}
            onFilterChange={updateFilter}
            onPageChange={setCurrentPage}
            onSearchChange={updateSearch}
            searchQuery={searchQuery}
            totalPages={totalPages}
          />
        </div>
      </div>
    </section>
  );
};

export default IrrigationManagement;
