import React, { useEffect, useRef } from 'react';

const Modal = ({ isModalOpen, onClose, onSubmit, plateNumber, setPlateNumber, mode, cars }) => {
  // Reference to the input field
	const inputRef = useRef(null);

	// Focus on the input field when the modal is open
  useEffect(() => {
    if (isModalOpen && mode === 'arrival' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen, mode]);

	// Return null if the modal is not open
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="nes-container is-rounded is-dark">
        <h2 className="text-xl mb-4">Enter Plate Number</h2>
        <form onSubmit={onSubmit}>
          {mode === 'arrival' ? (
            // Render input field for arrival mode
            <input
              type="text"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="Plate Number"
              className="px-4 py-2 border rounded w-full text-black"
              required
              ref={inputRef}
            />
          ) : (
            // Render select field for departure mode (Creating Car)
            <div className="nes-select flex flex-col justify-center">
              <select
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                className="default_select w-full text-black"
                required
              >
                <option value="" disabled selected hidden>Select Car</option>
                {cars.map((car, index) => (
                  <option key={index} value={car.plateNumber}>
                    {car.plateNumber}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="nes-btn "
            >
              Cancel
            </button>
            <button type="submit" className="nes-btn is-primary">
              {mode === 'arrival' ? 'Add Car' : 'Remove Car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;