import React from "react";

const StaffLists = ({ staffs }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {staffs.edges.map((staff) => (
        <div className="bg-gray-800 w-full h-24 flex justify-between text-sm text-gray-400">
          <div className="char flex">
            <img src={staff.node.image.large} className="w-16 h-full" />
            <div className="flex flex-col p-3 justify-between">
              <div className="name">{staff.node.name.full}</div>
              <div className="role text-xs">{staff.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffLists;
