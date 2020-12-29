import React from "react";
import ContentLoader from "react-content-loader";

const ItemSekeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={220}
      height={368}
      backgroundColor="#374151"
      foregroundColor="#4B5563"
    >
      <rect x="3" y="3" rx="5" ry="5" width="192" height="256" />
      <rect x="6" y="270" rx="0" ry="0" width="120" height="20" />
    </ContentLoader>
  );
};

export default ItemSekeleton;
