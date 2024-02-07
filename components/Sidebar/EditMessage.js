export default function EditMessage({ textRef, nodeName, setNodeName }) {
    console.log(nodeName, "===nodename");

    return (
        <div className=" z-4 text-xs">
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <textarea
                ref={textRef}
                value={nodeName}
                onChange={(evt) => setNodeName(evt.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    );
}
