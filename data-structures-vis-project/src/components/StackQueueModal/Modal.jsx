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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl mb-4 text-black">Enter Plate Number</h2>
        <form onSubmit={onSubmit}>
          {mode === 'arrival' ? (
            // Render input field for arrival mode
            <input
              type="text"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="Plate Number"
              className="px-4 py-2 border rounded mb-4 w-full text-black"
              required
              ref={inputRef}
            />
          ) : (
            // Render select field for departure mode (Creating Car)
            <div className="flex items-center gap-2">
              <select
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                className="px-4 py-2 border rounded mb-4 w-[251.33px] text-black"
                required
              >
                <option value="" disabled>Select Car</option>
                {cars.map((car, index) => (
                  <option key={index} value={car.plateNumber}>
                    {car.plateNumber}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 active:opacity-80"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:opacity-80">
              {mode === 'arrival' ? 'Add Car' : 'Remove Car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;