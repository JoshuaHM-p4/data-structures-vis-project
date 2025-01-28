import React, { useState, useEffect } from 'react';

import Modal from '../components/BinaryTreeComponents/BTTOperationModal.jsx';
import BSTCanvas from '../components/BinaryTreeComponents/BSTCanvas.jsx';

import useSound from '../hooks/useSound.js';
import clearTreeSound from "../assets/sounds/smw_kick.wav";
import addNodeSound from "../assets/sounds/smw_message_block.wav";
import cancelSound from "../assets/sounds/smw_kick.wav";
import traversalSelectSound from "../assets/sounds/smw_fireball.wav";


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
    const newNode = new Node(value); // Keep value as string to handle operators
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

// Function to parse arithmetic expression and build a binary tree
const parseExpressionToTree = (expression) => {
  const operators = ['+', '-', '*', '/', '^'];
  const precedence = { '^': 3, '*': 2, '/': 2, '+': 1, '-': 1 };
  const associativity = { '^': 'right', '*': 'left', '/': 'left', '+': 'left', '-': 'left' };

  // Helper function to create a tree node
  class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  const stack = [];
  const output = [];

  // Shunting-yard algorithm to convert infix to Reverse Polish Notation (RPN)
  for (const token of expression.replace(/\s+/g, '').split(/([+\-*/^()])/).filter(Boolean)) {
    if (!isNaN(token) || /^[a-zA-Z]+$/.test(token)) {
      // If the token is a number, push it to the output queue
      output.push(new TreeNode(token));
    } else if (operators.includes(token)) {
      // If the token is an operator
      while (
        stack.length &&
        operators.includes(stack[stack.length - 1]) &&
        ((associativity[token] === 'left' && precedence[token] <= precedence[stack[stack.length - 1]]) ||
          (associativity[token] === 'right' && precedence[token] < precedence[stack[stack.length - 1]]))
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    } else if (token === '(') {
      // Left parenthesis
      stack.push(token);
    } else if (token === ')') {
      // Right parenthesis
      while (stack.length && stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      stack.pop(); // Remove the left parenthesis
    }
  }

  // Pop all the operators remaining in the stack
  while (stack.length) {
    output.push(stack.pop());
  }

  // Build the binary tree from the RPN
  const treeStack = [];

  for (const token of output) {
    if (token instanceof TreeNode) {
      // If it's a number (node), push it to the tree stack
      treeStack.push(token);
    } else {
      // If it's an operator, pop two nodes and make them children
      const node = new TreeNode(token);
      node.right = treeStack.pop();
      node.left = treeStack.pop();
      treeStack.push(node);
    }
  }

  // The final tree is the only node left in the stack
  return treeStack[0];
};


const BinaryTreeTraversalPage = () => {
  const [tree, setTree] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [traversal, setTraversal] = useState('');
  const [traversalResult, setTraversalResult] = useState([]);
  const { playSound } = useSound();
  const [showTraversalResult, setShowTraversalResult] = useState(true);

  const toggleTraversalResult = () => {
    playSound(cancelSound);
    setShowTraversalResult(!showTraversalResult);
  };

  const handleAddNode = (input, useAlphabets = false) => {
    playSound(addNodeSound);
    const newTree = new BinarySearchTree();

    if (isNaN(input)) {
      // Input is an expression
      const root = parseExpressionToTree(input);
      newTree.root = root;
    } else {
      // Input is a level
      generateTreeByLevel(newTree, parseInt(input), useAlphabets);
    }

    setTree(newTree);
    setIsModalOpen(false);
    setTraversalResult([]);
    setTraversal('');
  };

  const generateTreeByLevel = (tree, level, useAlphabets = false) => {
    if (level === 0) return; // No nodes to add for level 0

    const addNodes = (node, currentLevel) => {
      if (currentLevel < level) {
        node.left = new Node(useAlphabets ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : Math.floor(Math.random() * 100).toString());
        node.right = new Node(useAlphabets ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : Math.floor(Math.random() * 100).toString());
        addNodes(node.left, currentLevel + 1);
        addNodes(node.right, currentLevel + 1);
      }
    };

    tree.root = new Node(useAlphabets ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : Math.floor(Math.random() * 100).toString());
    addNodes(tree.root, 1);
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
    playSound(traversalSelectSound);
    setTraversalResult(result);
  }, [traversal, tree]);

  const generateTree = () => {

    // generate tree with an expression
    const expression = '1+2*3-4/5';
    handleAddNode(expression);
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
    setTree(null);
    playSound(clearTreeSound);
    setTraversalResult([]);
    setTraversal('');
  }

  // Generate a random tree on page load
  useEffect(() => {
    generateTree();
  }
    , []);



  return (
    <div className='w-full h-full overflow-hidden bg-[url("/background/smb3-map.png")] bg-cover pixelated'>
      <div className='flex gap-2 justify-center top-20 left-0 absolute w-full h-fit'>
        <button onClick={() => setIsModalOpen(true)} className="nes-btn is-primary">
          Generate Tree
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

      <BSTCanvas tree={tree} traversal={traversal} mode={'treeTraversal'} />

      <Modal isModalOpen={isModalOpen} onClose={() => { playSound(cancelSound); setIsModalOpen(false) }} addNode={handleAddNode} />

      {/* Traversal Result Overlay */}
      {traversalResult.length > 0 && (
        showTraversalResult ?
          (
            <div className="fixed bottom-6 w-full flex justify-center">
              <div className="nes-container is-centered is-dark is-rounded with-title w-4/5">
                <button onClick={toggleTraversalResult} className="absolute top-1 right-1 nes-btn px-2 py-1 rounded">
                  {showTraversalResult ? '-' : '☰'}
                </button>
                <p className="title">{traversalText(traversal)} Traversal Result</p>
                <p>{traversalResult.join(' ')}</p>
                <span className='nes-text is-success w-full d-flex flex-row-reverse'>(Length: {traversalResult.length})</span>
              </div>
            </div>
          )
          :
          (
            <div className="fixed bottom-6 w-full flex justify-center">
              <button onClick={toggleTraversalResult} className="nes-btn px-2 py-1 rounded">
                {showTraversalResult ? '-' : '☰'}
              </button>
            </div>
          )
      )
      }

    </div>
  );
};

export default BinaryTreeTraversalPage;
