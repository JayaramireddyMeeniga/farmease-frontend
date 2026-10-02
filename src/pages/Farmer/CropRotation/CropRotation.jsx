import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toast";
import CropRotationHeader from "./CropRotationHeader";
import RotationBoard from "./RotationBoard";
import RotationDialog from "./RotationDialog";
import { initialRotations } from "./cropRotationData";
import { getRotationSummary, parseCropInput } from "./cropRotationUtils";

const emptyRotation = {
  year: "",
  crops: "",
};

const ROTATIONS_PER_PAGE = 1;

const CropRotationPlanner = () => {
  const [rotations, setRotations] = useState(initialRotations);
  const [newRotation, setNewRotation] = useState(emptyRotation);
  const [editId, setEditId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const summary = useMemo(() => getRotationSummary(rotations), [rotations]);
  const totalPages = Math.max(
    1,
    Math.ceil(rotations.length / ROTATIONS_PER_PAGE),
  );
  const firstVisibleIndex = (currentPage - 1) * ROTATIONS_PER_PAGE;
  const visibleRotations = rotations.slice(
    firstVisibleIndex,
    firstVisibleIndex + ROTATIONS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const resetForm = () => {
    setNewRotation(emptyRotation);
    setEditId(null);
  };

  const closeDialog = () => {
    resetForm();
    setIsDialogOpen(false);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const updateFormField = (field, value) => {
    setNewRotation((rotation) => ({ ...rotation, [field]: value }));
  };

  const addRotation = () => {
    if (!newRotation.year.trim() || !newRotation.crops.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const crops = parseCropInput(newRotation.crops);

    if (editId) {
      setRotations((prev) =>
        prev.map((rotation) =>
          rotation.id === editId
            ? { ...rotation, year: newRotation.year, crops }
            : rotation,
        ),
      );
    } else {
      const nextId =
        rotations.length > 0
          ? Math.max(...rotations.map((rotation) => rotation.id)) + 1
          : 1;

      setRotations((prev) => [
        ...prev,
        {
          id: nextId,
          year: newRotation.year,
          crops,
        },
      ]);
      setCurrentPage(Math.ceil((rotations.length + 1) / ROTATIONS_PER_PAGE));
    }

    closeDialog();
  };

  const editRotation = (rotation) => {
    setNewRotation({ year: rotation.year, crops: rotation.crops.join(", ") });
    setEditId(rotation.id);
    setIsDialogOpen(true);
  };

  const deleteRotation = (id) => {
    if (window.confirm("Are you sure you want to delete this rotation?")) {
      setRotations((prev) => prev.filter((rotation) => rotation.id !== id));
    }
  };

  return (
    <section className="min-h-screen bg-[#eef5f7] px-4 py-4 text-[#17251e] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <CropRotationHeader summary={summary} />

        <RotationBoard
          currentPage={currentPage}
          firstVisibleIndex={firstVisibleIndex}
          onPageChange={setCurrentPage}
          rotations={rotations}
          totalPages={totalPages}
          visibleRotations={visibleRotations}
          onAdd={openAddDialog}
          onDelete={deleteRotation}
          onEdit={editRotation}
        />
      </div>

      <RotationDialog
        editId={editId}
        isOpen={isDialogOpen}
        newRotation={newRotation}
        onCancel={closeDialog}
        onChange={updateFormField}
        onSubmit={addRotation}
      />
    </section>
  );
};

export default CropRotationPlanner;
