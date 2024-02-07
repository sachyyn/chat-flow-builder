"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from "reactflow";
import { v4 as uuid } from "uuid";

import Sidebar from "../components/Sidebar/Sidebar";
import Node from "../components/CustomNode/CustomNode";

import { isAllNodeisConnected } from "../utils/utils";
import {
  nodes as initialNodes,
  edges as initialEdges
} from "../utils/constants";
import "reactflow/dist/style.css";
import './App.css';
import Alert from "@/components/Alert";

const getId = () => uuid();

const nodeTypes = { node: Node };

const OverviewFlow = () => {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [displayAlert, setDisplayAlert] = useState("");

  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("application/reactflow");
    const label = event.dataTransfer.getData("description");
    console.log(reactFlowInstance, "reactIns");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { title: "Send Message", description: label }
    };
    setNodes((es) => es.concat(newNode));
    setSelectedNode(newNode.id);
  };
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      ),
    [setEdges]
  );

  const [nodeName, setNodeName] = useState("Node 1");

  useEffect(() => {
    const node = nodes.filter((node) => {
      if (node.selected) return true;
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
      setIsSelected(true);
    } else {
      setSelectedNode("");
      setIsSelected(false);
    }
  }, [nodes]);
  useEffect(() => {
    setNodeName(selectedNode?.data?.description || '');
  }, [selectedNode]);
  useEffect(() => {
    textRef?.current?.focus();
  }, [selectedNode]);
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            description: nodeName || " "
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);

  const showAlert = (message) => {
    setDisplayAlert(message);
    setTimeout(() => {
      setDisplayAlert("");
    }, 3000);
  }

  const saveHandler = () => {
    if (isAllNodeisConnected(nodes, edges)) showAlert("Good Job");
    else showAlert("Gotta connect it buddy");
  };

  return (
    <>
      <button
        onClick={saveHandler}
        className="absolute left-[50%] top-4 px-4 py-2 rounded-lg z-10 border-indigo-600 border hover:bg-indigo-50 hover:shadow-lg inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      >
        Save
      </button>
      {displayAlert && (
        <Alert message={displayAlert} />
      )
      }
      <div className="chatflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
              attributionPosition="top-right"
            >
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>

          <Sidebar
            isSelected={isSelected}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;

