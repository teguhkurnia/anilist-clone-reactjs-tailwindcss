import React from "react";
import { useQuery, gql } from "@apollo/client";
import ItemList from "../Item/ItemList";
import ItemSekeleton from "../Item/ItemSekeleton";

const ItemsWrapper = ({ title, season, year, sort }) => {
  const PAGE = gql`
    query getPage($season: MediaSeason, $year: Int, $sort: [MediaSort]) {
      Page(page: 1, perPage: 6) {
        media(type: ANIME, season: $season, seasonYear: $year, sort: $sort) {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          genres
          coverImage {
            extraLarge
            large
            medium
            color
          }
          bannerImage
          status
          studios(isMain: true) {
            nodes {
              id
              name
            }
          }
          airingSchedule(notYetAired: true, perPage: 1) {
            nodes {
              airingAt
              timeUntilAiring
              episode
            }
          }
          season
          seasonYear
          format
          episodes
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(PAGE, {
    variables: {
      season,
      year,
      sort,
    },
  });

  if (error) return <p>{error.message} :(</p>;
  if (loading)
    return (
      <div className="item-wrapper">
        <h1 className="mb-5 text-gray-300 font-semibold">{title}</h1>
        <div className="loading flex">
          <ItemSekeleton />
          <ItemSekeleton />
          <ItemSekeleton />
          <ItemSekeleton />
          <ItemSekeleton />
        </div>
      </div>
    );
  return (
    <div className="item-wrapper">
      <h1 className="mb-5 text-gray-300 font-semibold">{title}</h1>
      <ItemList items={data.Page.media} />
    </div>
  );
};

export default ItemsWrapper;
