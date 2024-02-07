import React from "react";
import EditMessage from "./EditMessage";

const Sidebar = ({ isSelected, textRef, nodeName, setNodeName }) => {
    const onDragStart = (event, nodeType, content) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.setData("content", content);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside className="flex h-screen flex-col justify-between border-e bg-white border-l-gray-100 border ">
            {isSelected ? (
                <EditMessage
                    textRef={textRef}
                    nodeName={nodeName}
                    setNodeName={setNodeName}
                />
            ) : (
                <div
                    className="rounded-xl bg-white p-4 ring ring-indigo-50 "
                    onDragStart={(event) => onDragStart(event, "node", "message")}
                    draggable
                >
                        <span className="mt-4 text-md font-400" > Message</span>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
