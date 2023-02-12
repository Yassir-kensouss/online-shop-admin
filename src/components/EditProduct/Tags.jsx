import { Chips } from "primereact";
import React, { useState } from "react";

const Tags = (props) => {

    const {tags, setTags} = props

    const handleTags = (e) => {
      setTags(e.value);
    }

  return (
    <div className="bg-white p-3 border-round-sm mt-3">
      <h2 className="text-xl mb-5 font-medium text-800">Tags</h2>
      <div className="flex gap-4">
        <Chips max={8} className="w-full tags-chips" value={tags} onChange={handleTags} placeholder='Add your tags and press Enter' />
      </div>
    </div>
  );
};

export default Tags;
