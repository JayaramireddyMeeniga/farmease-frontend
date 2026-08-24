import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Edit2Icon,
  Filter,
  Leaf,
  MapPinned,
  Plus,
  Search,
  Sprout,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "react-toast";
import CropStats from "./CropStats";

const statusConfig = {
  Growing: {
    icon: Sprout,
    cardAccent: "border-emerald-200 bg-emerald-50/70 text-emerald-700",
    chip: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  Harvested: {
    icon: CheckCircle2,
    cardAccent: "border-amber-200 bg-amber-50/70 text-amber-700",
    chip: "bg-amber-100 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  Planted: {
    icon: Clock3,
    cardAccent: "border-sky-200 bg-sky-50/70 text-sky-700",
    chip: "bg-sky-100 text-sky-700 ring-sky-200",
    dot: "bg-sky-500",
  },
};

const filterOptions = ["All", "Growing", "Harvested", "Planted"];

const getAreaValue = (area) => {
  const parsed = Number.parseFloat(area);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const CropManagement = () => {
  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", area: "10 acres", status: "Growing" },
    { id: 2, name: "Corn", area: "5 acres", status: "Harvested" },
    { id: 3, name: "Rice", area: "8 acres", status: "Planted" },
    { id: 4, name: "Soybean", area: "12 acres", status: "Growing" },
    { id: 5, name: "Barley", area: "7 acres", status: "Harvested" },
    { id: 6, name: "Potato", area: "6 acres", status: "Growing" },
    { id: 7, name: "Tomato", area: "3 acres", status: "Planted" },
    { id: 8, name: "Cotton", area: "15 acres", status: "Growing" },
    { id: 9, name: "Sunflower", area: "9 acres", status: "Harvested" },
    { id: 10, name: "Sugarcane", area: "20 acres", status: "Growing" },
    { id: 11, name: "Carrot", area: "4 acres", status: "Planted" },
    { id: 12, name: "Onion", area: "5 acres", status: "Growing" },
    { id: 13, name: "Cabbage", area: "3 acres", status: "Harvested" },
    { id: 14, name: "Pumpkin", area: "2 acres", status: "Growing" },
    { id: 15, name: "Pepper", area: "1 acre", status: "Planted" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editCropId, setEditCropId] = useState(null);
  const [newCrop, setNewCrop] = useState({ name: "", area: "", status: "" });
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setNewCrop({ ...newCrop, [e.target.name]: e.target.value });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditCropId(null);
    setNewCrop({ name: "", area: "", status: "" });
  };

  const addCrop = () => {
    if (!newCrop.name.trim() || !newCrop.area.trim() || !newCrop.status) {
      toast.error("Please fill in all fields");
      return;
    }

    const cropPayload = {
      name: newCrop.name.trim(),
      area: newCrop.area.trim(),
      status: newCrop.status,
    };

    if (editCropId !== null) {
      setCrops(
        crops.map((crop) =>
          crop.id === editCropId ? { ...crop, ...cropPayload } : crop,
        ),
      );
    } else {
      const nextId =
        crops.length > 0 ? Math.max(...crops.map((crop) => crop.id)) + 1 : 1;
      setCrops([...crops, { id: nextId, ...cropPayload }]);
    }

    closeDialog();
  };

  const deleteCrop = (id) => {
    setCrops(crops.filter((crop) => crop.id !== id));
  };

  const editCrop = (crop) => {
    setNewCrop({ name: crop.name, area: crop.area, status: crop.status });
    setEditCropId(crop.id);
    setIsDialogOpen(true);
  };

  const statusCounts = useMemo(
    () =>
      crops.reduce(
        (counts, crop) => ({
          ...counts,
          [crop.status]: (counts[crop.status] || 0) + 1,
        }),
        { All: crops.length, Growing: 0, Harvested: 0, Planted: 0 },
      ),
    [crops],
  );

  const totalArea = useMemo(
    () => crops.reduce((total, crop) => total + getAreaValue(crop.area), 0),
    [crops],
  );

  const filteredCrops = useMemo(
    () =>
      crops.filter((crop) => {
        const matchesStatus =
          filterStatus === "All" || crop.status === filterStatus;
        const matchesSearch = crop.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim());

        return matchesStatus && matchesSearch;
      }),
    [crops, filterStatus, searchTerm],
  );

  return (
    <div className="min-h-screen py-4 text-slate-900 sm:px-6 lg:px-6">
      <section className="overflow-hidden rounded-lg border border-green-900/10 bg-white shadow-xl shadow-green-900/5">
        <div className="bg-linear-to-r from-green-900 via-emerald-800 to-teal-700 p-5 text-white">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full">
              <div className="flex w-full items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-semibold leading-tight">
                      Crop Management
                    </h1>

                    <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-sm font-medium text-green-50 ring-1 ring-white/20">
                      <Leaf className="h-4 w-4" />
                      Field planning dashboard
                    </div>
                  </div>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-green-50/90">
                    Track crop stages, acreage, and field activity from one focused workspace.
                  </p>
                </div>

                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-green-800 shadow-lg shadow-green-950/20 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white/80"
                >
                  <Plus className="h-4 w-4" />
                  Add Crop
                </button>
              </div>
            </div>
          </div>

          <CropStats
            cropCount={crops.length}
            totalArea={totalArea}
            growingCount={statusCounts.Growing}
            harvestedCount={statusCounts.Harvested}
          />
        </div>

        <div className="border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="w-full xl:max-w-md">
              <div className="flex py-2 w-full items-center overflow-hidden rounded-md border border-slate-200 bg-slate-50 transition focus-within:border-green-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-100">
                <Search className="ml-3 h-4 w-4 shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search crops"
                  className="h-full min-w-0 flex-1 border-none bg-transparent px-3 text-sm text-slate-800 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                <Filter className="h-4 w-4" />
                Status
              </span>
              {filterOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilterStatus(status)}
                  className={`py-2 rounded-lg px-3 text-sm font-semibold transition ${filterStatus === status
                    ? "bg-green-700 text-white shadow-md shadow-green-900/15"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {status} ({statusCounts[status]})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-50/80 px-5 py-5">
          {filteredCrops.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCrops.map((crop) => {
                const config = statusConfig[crop.status] || statusConfig.Growing;
                const StatusIcon = config.icon;

                return (
                  <article
                    key={crop.id}
                    className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-lg hover:shadow-green-900/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className={`flex p-3 shrink-0 items-center justify-center rounded-lg border ${config.cardAccent}`}
                        >
                          <StatusIcon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h2 className="truncate text-lg font-semibold text-slate-900">
                            {crop.name}
                          </h2>
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                            <MapPinned className="h-4 w-4 text-slate-400" />
                            {crop.area}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${config.chip}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                        {crop.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Area
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {crop.area}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Stage
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {crop.status}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        onClick={() => editCrop(crop)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
                        title="Edit crop"
                        aria-label={`Edit ${crop.name}`}
                      >
                        <Edit2Icon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteCrop(crop.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200"
                        title="Delete crop"
                        aria-label={`Delete ${crop.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-700">
                <Search className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                No crops found
              </h2>
              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Try a different search or status filter to see more crop
                records.
              </p>
            </div>
          )}
        </div>
      </section>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-2xl shadow-slate-950/30">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editCropId ? "Edit Crop" : "Add Crop"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep field records current and easy to scan.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                aria-label="Close crop form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Crop name
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Wheat"
                  value={newCrop.name}
                  onChange={handleInputChange}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Area
                </span>
                <input
                  type="text"
                  name="area"
                  placeholder="5 acres"
                  value={newCrop.area}
                  onChange={handleInputChange}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Status
                </span>
                <select
                  name="status"
                  value={newCrop.status}
                  onChange={handleInputChange}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                >
                  <option value="">Select Status</option>
                  <option value="Growing">Growing</option>
                  <option value="Harvested">Harvested</option>
                  <option value="Planted">Planted</option>
                </select>
              </label>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDialog}
                className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addCrop}
                className="h-10 rounded-lg bg-green-700 px-4 text-sm font-semibold text-white shadow-md shadow-green-900/15 transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                {editCropId ? "Update Crop" : "Create Crop"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropManagement;
