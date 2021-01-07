import React from "react";

const CharacterLists = ({ characters }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-2">
      {characters.edges.map((char) => (
        <div className="bg-gray-800 w-full h-24 mb-3 lg:mb-0 flex justify-between text-sm text-gray-400">
          <div className="char flex">
            <img src={char.node.image.large} className="w-16 h-full" />
            <div className="flex flex-col p-3 justify-between">
              <div className="name">{char.node.name.full}</div>
              <div className="role text-xs">{char.role}</div>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <img
              src={char.voiceActors[0]?.image.large}
              className="w-16 h-full"
            />
            <div className="flex flex-col p-3 justify-between text-right">
              <div className="name">{char.voiceActors[0]?.name.full}</div>
              <div className="role text-xs">
                {char.voiceActors[0]?.language}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterLists;
