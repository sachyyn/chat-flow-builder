import React, { memo } from "react";

import { Handle, Position } from "reactflow";

const Node = ({ data, selected }) => {
  return (
    <div className="relative block overflow-hidden rounded-lg border border-gray-100 shadow-indigo-100">
      <div className={`text-lg text-gray-900 sm:text-xl ${selected ? "shadow-lg" : "shadow-md"} border-0 rounded-lg text-sm`}>
        <div className="relative font-500 py-2 px-8 bg-indigo-100 rounded-t-lg">{data.title}</div>
        <div className="p-2 text-[16px] ">{data.description}</div>
      </div>
      <Handle type="source" className="w-3 h-3"  position={Position.Right} id="b" />
      <Handle type="target" className="w-3 h-3" position={Position.Left} id="a" />
    </div>
  );
};

export default memo(Node);
