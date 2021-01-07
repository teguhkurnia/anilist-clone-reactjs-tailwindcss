import React from "react";
import { gql, useQuery } from "@apollo/client";

const Watch = ({ id }) => {
  const WATCH = gql`
    query($id: Int) {
      Media(id: $id) {
        streamingEpisodes {
          title
          thumbnail
          url
          site
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(WATCH, {
    variables: {
      id,
    },
  });

  if (error) return <p>{error.message} :(</p>;
  if (loading) return <div className="item-wrapper">LOADING...</div>;
  const { streamingEpisodes } = data.Media;
  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {streamingEpisodes.map((link) => (
        <div
          className="banner-image h-28 flex items-end rounded"
          style={{ background: `url(${link.thumbnail})`, boxShadow: "none" }}
        >
          <div className="bg-gray-800 bg-opacity-50 truncate text-gray-50 text-xs p-2">
            {link.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Watch;
