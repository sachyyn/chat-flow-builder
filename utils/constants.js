import { MarkerType } from "reactflow";

const nodes = [
  {
    id: "1",
    type: "node",
    data: { title: "Send Message", description: "Hey Jason" },
    position: { x: 200, y: 200 }
  },
  {
    id: "2",
    type: "node",
    data: { title: "Send Message", description: "Hola David" },
    position: { x: 500, y: 200 }
  }
];

const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  }
];

export { nodes, edges };
