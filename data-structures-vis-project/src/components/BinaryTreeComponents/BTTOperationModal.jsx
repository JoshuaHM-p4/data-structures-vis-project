import { useState, useEffect, useRef } from 'react';

const Modal = ({ isModalOpen, onClose, addNode }) => {
  // Reference to the input field
  const inputRef = useRef(null);
  const [expression, setExpression] = useState('');
  const [level, setLevel] = useState('0'); // Default to level 0
  const [useAlphabets, setUseAlphabets] = useState(true);

  // Focus on the input field when the modal is open
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setExpression('');
    setLevel('0'); // Reset level when modal opens
    setUseAlphabets(true); // Reset useAlphabets when modal opens
  }, [isModalOpen]);

  // Return null if the modal is not open
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="nes-container is-rounded is-dark w-[430px]">
        {/* select generate by level number from 0-5 */}
        <h2 className="text-xl mb-4">Select Generate by Level</h2>
        <form className='nes-select' onSubmit={(e) => { e.preventDefault(); addNode(level, useAlphabets); }}>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="px-4 py-2 border rounded w-full text-black"
            required
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {/* checkbox for using alphabet */}
          <div style={{ backgroundColor: '#212529', padding: '1rem 0' }}>
            <label>
              <input
                type="checkbox"
                className="nes-checkbox is-dark"
                checked={useAlphabets}
                onChange={(e) => setUseAlphabets(e.target.checked)}
              />
              <span>Use Alphabet</span>
            </label>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="nes-btn is-primary">
              Generate
            </button>
          </div>
        </form>

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
      </div>
    </div>
  );
};

export default Modal;