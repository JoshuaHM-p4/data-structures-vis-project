import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit, plateNumber, setPlateNumber, mode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl mb-4 text-black">Enter Plate Number</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder="Plate Number"
            className="px-4 py-2 border rounded mb-4 w-full text-black"
            required
          />
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