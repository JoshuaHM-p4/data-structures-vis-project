import { useState, useEffect, useRef } from 'react';

const Modal = ({ isModalOpen, onClose, addNode }) => {
  // Reference to the input field
  const inputRef = useRef(null);
  const [expression, setExpression] = useState('');

  // Focus on the input field when the modal is open
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setExpression('');
  }, [isModalOpen]);

  // Return null if the modal is not open
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="nes-container is-rounded is-dark w-[430px]">
        <h2 className="text-xl mb-4">Enter Arithmetic Expression</h2>
        <form onSubmit={(e) => { e.preventDefault(); addNode(expression); }}>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Enter expression"
            className="px-4 py-2 border rounded w-full text-black"
            required
            ref={inputRef}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="nes-btn"
            >
              Cancel
            </button>
            <button type="submit" className="nes-btn is-primary">
              Add Expression
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default Modal;