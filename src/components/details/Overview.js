import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import ReactTooltip from "react-tooltip";
import CharacterLists from "./CharacterLists";
import StaffLists from "./StaffLists";

const Overview = ({ id }) => {
  const [colors, setColors] = useState(["green", "blue", "purple", "pink"]);
  const [hover, setHover] = useState(false);
  const OVERVIEW = gql`
    query($id: Int) {
      Media(id: $id) {
        description
        relations {
          edges {
            id
            relationType
            node {
              id
              title {
                userPreferred
              }
              format
              status
              coverImage {
                extraLarge
              }
            }
          }
        }
        characters(perPage: 6, page: 1, sort: ROLE) {
          edges {
            role
            voiceActors {
              id
              name {
                full
              }
              language
              image {
                large
              }
            }
            node {
              id
              name {
                full
              }
              image {
                large
              }
            }
          }
        }
        staff(page: 1, perPage: 4) {
          edges {
            id
            role
            node {
              id
              name {
                full
              }
              image {
                large
              }
            }
          }
        }
        stats {
          scoreDistribution {
            score
            amount
          }
          statusDistribution {
            status
            amount
          }
        }
        streamingEpisodes {
          title
          thumbnail
          url
          site
        }
        trailer {
          id
          site
          thumbnail
        }
        recommendations(page: 1, perPage: 5) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          nodes {
            mediaRecommendation {
              id
              title {
                userPreferred
              }
              coverImage {
                extraLarge
              }
            }
          }
        }
        reviews(page: 1, perPage: 2, sort: RATING_DESC) {
          nodes {
            summary
            user {
              avatar {
                large
              }
            }
            rating
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(OVERVIEW, {
    variables: {
      id,
    },
  });

  if (error) return <p>{error.message} :(</p>;
  if (loading) return <div className="item-wrapper">LOADING...</div>;
  const media = data.Media;
  const total = media.stats.statusDistribution
    .filter((stat) => stat.status !== "DROPPED")
    .reduce(function (cnt, o) {
      return cnt + o.amount;
    }, 0);
  const largestScore = Math.max(
    ...Array.from(media.stats.scoreDistribution, (x) => x.amount)
  );

  return (
    <div className="overview w-full">
      <div className="description py-5 block lg:hidden">
        <div className="label text-gray-400 text-sm font-semibold pb-3">
          Description
        </div>
        <div className="bg-gray-800 p-5 text-gray-400 text-sm">
          <div dangerouslySetInnerHTML={{ __html: media.description }} />
        </div>
      </div>
      <div className="relations">
        <div className="label text-gray-400 text-sm font-semibold pb-3">
          Relations
        </div>
        <div className="flex lg:grid grid-cols-2 gap-2 w-full pb-2 overflow-x-scroll whitespace-nowrap">
          {media.relations.edges.map((rel, index) => (
            <div className="h-32 bg-gray-800 mr-3 lg:mr-0 flex" key={index}>
              <img
                src={rel.node.coverImage.extraLarge}
                className="w-24 h-full"
              />
              <div className="info w-72 h-full text-sm p-3 font-medium flex flex-col justify-between">
                <div>
                  <div className="type text-blue-500 font-semibold mb-1">
                    {rel.relationType}
                  </div>
                  <div className="media-title text-gray-400 hover:text-blue-500 whitespace-pre-wrap">
                    {rel.node.title.userPreferred}
                  </div>
                </div>
                <div className="info text-gray-400 text-xs">{`${rel.node.format} · ${rel.node.status}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="characters py-5">
        <div className="label text-gray-400 text-sm font-semibold pb-3">
          Characters
        </div>

        <CharacterLists characters={media.characters} />
      </div>

      <div className="staff py-5">
        <div className="label text-gray-400 text-sm font-semibold pb-3">
          Staff
        </div>
        <StaffLists staffs={media.staff} />
      </div>

      <div className="stats">
        <div className="label text-gray-400 text-sm font-semibold pb-3">
          Status Distribution
        </div>
        <div className="bg-gray-800 rounded overflow-hidden">
          <div className="p-5 flex justify-between">
            {media.stats.statusDistribution
              .filter((stat) => stat.status !== "DROPPED")
              .map((stat, index) => (
                <div className="stat" key={index}>
                  <div
                    className={`bg-${colors[index]}-400 text-${colors[index]}-50 w-min px-3 py-1 rounded-md text-sm`}
                    data-tip
                    data-for="registerTip"
                  >
                    {stat.status}
                  </div>
                  <div className={`text-${colors[index]}-400 text-center mt-2`}>
                    {stat.amount}{" "}
                    <span className="text-sm text-gray-400">Users</span>
                  </div>
                </div>
              ))}
          </div>
          <div className="chart flex">
            {media.stats.statusDistribution
              .filter((stat) => stat.status !== "DROPPED")
              .map((stat, index) => {
                if (index >= 2) {
                  return (
                    <div
                      className={`bg-${colors[index]}-400 h-3 tooltip-o`}
                      style={{ width: `${(stat.amount / total) * 100}%` }}
                    >
                      <span className="tooltip-text text-xs bg-gray-700 rounded text-gray-200 -mt-7 right-9">
                        {stat.status}
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`bg-${colors[index]}-400 h-3 tooltip-o`}
                      style={{ width: `${(stat.amount / total) * 100}%` }}
                    >
                      <span className="tooltip-text text-xs bg-gray-700 rounded text-gray-200 -mt-7">
                        {stat.status}
                      </span>
                    </div>
                  );
                }
              })}
            <ReactTooltip id="stat" place="top" type="dark" effect="float" />
          </div>
        </div>
      </div>

      <div className="stats py-5">
        <div className="label text-gray-400 text-sm font-semibold pb-3">
          Score Distribution
        </div>
        <div className="w-full h-36 rounded bg-gray-800 flex items-end p-5 justify-between">
          {media.stats.scoreDistribution.map((score) => (
            <div
              className="w-5 bg-green-400 rounded-full"
              style={{
                height: `${
                  (score.amount / largestScore) * 100 + 20 > 100
                    ? 100
                    : (score.amount / largestScore) * 100 + 20
                }%`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="watch py-5">
        <div className="label text-gray-400 text-sm font-semibold pb-3">
          Watch
        </div>
        <div className="flex w-full">
          {media.streamingEpisodes.slice(0, 1).map((episode, index) => {
            return (
              <div
                className="m-2 w-1/2 h-28 banner-image flex items-end rounded overflow-hidden"
                style={{
                  background: `url(${episode.thumbnail})`,
                  boxShadow: "none",
                }}
              >
                <div
                  className="eps-title bg-gray-700 bg-opacity-30 text-gray-100 text-xs truncate p-1 w-full"
                  title={episode.title}
                >
                  {episode.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {media.trailer ? (
        <div className="watch py-5">
          <div className="label text-gray-400 text-sm font-semibold pb-3">
            Trailer
          </div>
          <iframe
            className="w-full h-60 rounded"
            src={`https://${media.trailer.site}.com/embed/${media.trailer.id}`}
            frameborder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : null}

      <div className="watch py-5">
        <div className="label text-gray-400 text-sm font-semibold pb-3">
          Recommendations
        </div>

        <div className="flex overflow-x-scroll">
          {media.recommendations.nodes.map((rec) => (
            <div className="w-32 mr-3 flex-shrink-0 h-52">
              <img
                src={rec.mediaRecommendation.coverImage.extraLarge}
                alt="mediaimage"
                className="w-full h-40"
              />

              <a
                href="#"
                className="title mt-1 text-sm text-gray-400 font font-semibold hover:text-blue-500"
              >
                {rec.mediaRecommendation.title.userPreferred}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="watch py-5">
        <div className="label text-gray-400 text-sm font-semibold pb-3">
          Reviews
        </div>

        {media.reviews.nodes.map((review) => (
          <div className="w-full min-h-0 flex justify-between mb-3">
            <img
              src={review.user.avatar.large}
              alt="useravatar"
              className="h-14 w-14"
            />
            <div className="bg-gray-800 w-5/6 p-3 text-sm text-gray-400 text-center rounded">
              {review.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
