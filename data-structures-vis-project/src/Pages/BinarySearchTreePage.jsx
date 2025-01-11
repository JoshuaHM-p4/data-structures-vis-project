import React, { useState, useEffect } from 'react';

import Modal from '../components/BinaryTreeComponents/BSTNodeModal.jsx';
import BSTCanvas from '../components/BinaryTreeComponents/BSTCanvas.jsx';

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a new value into the BST
  insert(value) {
    const newNode = new Node(Number(value)); // Convert value to number
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (newNode.value < current.value) { // Use newNode.value for comparison
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  // Search for a value in the BST
  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  // Find a node in the BST
  findNode(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }

  // In-order traversal (for sorted output)
  inOrderTraversal(node = this.root, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }

  // Pre-order traversal
  preOrderTraversal(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrderTraversal(node.left, result);
      this.preOrderTraversal(node.right, result);
    }
    return result;
  }

  // Post-order traversal
  postOrderTraversal(node = this.root, result = []) {
    if (node) {
      this.postOrderTraversal(node.left, result);
      this.postOrderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // Node count in the BST
  nodeCount(node = this.root) {
    if (!node) return 0;
    return 1 + this.nodeCount(node.left) + this.nodeCount(node.right);
  }

  // Height of the BST (level)
  height(node = this.root) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  // Minimum value in the BST
  minValue(node = this.root) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }

  // Maximum value in the BST
  maxValue(node = this.root) {
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }
}

const BinarySearchTreePage = () => {
  const [tree, setTree] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodeValue, setNodeValue] = useState('');
  const [traversal, setTraversal] = useState('');
  const [traversalResult, setTraversalResult] = useState([]);

  const handleAddNode = (value) => {
    if (!tree) {
      const newTree = new BinarySearchTree();
      newTree.insert(value);
      setTree(newTree);
    } else {
      tree.insert(value);
      setTree(Object.assign(Object.create(Object.getPrototypeOf(tree)), tree));
    }
    setIsModalOpen(false);
    setNodeValue('');
    setTraversalResult([]);
    setTraversal('');
    console.log(tree);
  };

  const clearTree = () => {
    setTree(null);
  };

  useEffect(() => {
    if (!traversal || !tree || !tree.root) {
      setTraversalResult([]);
      return;
    };

    let result = [];
    switch (traversal) {
      case 'inOrder':
        result = tree.inOrderTraversal();
        break;
      case 'preOrder':
        result = tree.preOrderTraversal();
        break;
      case 'postOrder':
        result = tree.postOrderTraversal();
        break;
      default:
        break;
    }
    console.log(`${traversal} Traversal:`, result);
    setTraversalResult(result);
  }, [traversal, tree]);

  const generateTree = () => {
    const newTree = new BinarySearchTree();
    // generate values to create a complete binary tree
    const values = [10, 5, 15, 3, 7, 12, 18, 2, 4, 6, 8, 11, 13, 17, 19];
    // randomize values but retain the completeness
    // values.sort(() => Math.random() - 0.5);
    values.forEach(value => newTree.insert(value));
    setTree(newTree);
  };

  const traversalText = (traversal) => {
    switch (traversal) {
      case 'inOrder':
        return 'In-order';
      case 'preOrder':
        return 'Pre-order';
      case 'postOrder':
        return 'Post-order';
      default:
        return '';
    }
  }

  const handleClearTree = () => {
    clearTree();
    setTraversalResult([]);
    setTraversal('');
  }

  // Generate a random tree on page load
  useEffect(() => {
    generateTree();
  }
  , []);



  return (
    <div className='w-full h-full overflow-hidden bg-[url("/background/world-map.png")] bg-cover pixelated'>
      <div className='flex gap-2 justify-center top-20 left-0 absolute w-full h-fit'>
        <button onClick={() => setIsModalOpen(true)} className="nes-btn is-primary">
          Add Node
        </button>

        <div className="nes-select flex flex-col justify-center w-fit p-0">
          <select
            className="default_select text-black"
            value={traversal}
            onChange={(e) => setTraversal(e.target.value)}
          >
            <option value="" disabled>Select Traversal</option>
            {tree?.root ?
              ['inOrder', 'preOrder', 'postOrder'].map((traversal) => (
                <option key={traversal} value={traversal}>
                  {traversalText(traversal)}
                </option>
              ))
            : (
              <option value="" disabled>
                No Tree Available
              </option>
            )
            }
          </select>
        </div>

        <button onClick={handleClearTree} className="nes-btn">
          Clear Tree
        </button>
      </div>

      <BSTCanvas tree={tree} traversal={traversal}/>

      <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addNode={handleAddNode} />

      {/* Traversal Result Overlay */}
      {traversalResult.length > 0 && (
        <div className="fixed bottom-6 w-full flex justify-center">
          <div className="nes-container is-centered is-dark is-rounded with-title w-4/5">
            <p className="title">{traversalText(traversal)} Traversal Result</p>
            <p>{traversalResult.join(', ')}</p>
            <span className='nes-text is-success w-full d-flex flex-row-reverse'>(Length: {traversalResult.length})</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default BinarySearchTreePage;
