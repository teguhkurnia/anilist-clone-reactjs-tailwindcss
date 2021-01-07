import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import Overview from "../components/details/Overview";
import {
  NavLink,
  Route,
  BrowserRouter,
  Switch,
  useRouteMatch,
  Link,
} from "react-router-dom";
import Watch from "../components/details/Watch";
import Character from "../components/details/Character";
import Staff from "../components/details/Staff";

const Detail = ({ match }) => {
  const MEDIA = gql`
    query($id: Int) {
      Media(id: $id) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        description
        coverImage {
          extraLarge
        }
        bannerImage
        rankings {
          id
          rank
          context
        }
        airingSchedule(notYetAired: true, page: 1, perPage: 1) {
          nodes {
            id
            episode
            airingAt
          }
        }
        format
        episodes
        duration
        status
        startDate {
          year
          month
          day
        }
        averageScore
        meanScore
        popularity
        favourites
        studios {
          nodes {
            id
            name
            isAnimationStudio
          }
        }
        source
        hashtag
        genres
        synonyms
        season
        seasonYear
      }
    }
  `;
  const { loading, error, data } = useQuery(MEDIA, {
    variables: {
      id: match.params.id,
    },
  });

  let { path, url } = useRouteMatch();
  const [navigation, setNavigation] = useState([
    {
      label: "Overview",
      to: "/anime/" + match.params.id,
    },
    {
      label: "Watch",
      to: `${url}/watch`,
    },
    {
      label: "Characters",
      to: `${url}/characters`,
    },
    {
      label: "Staff",
      to: `${url}/staff`,
    },
    {
      label: "Stats",
      to: "/",
    },
    {
      label: "Social",
      to: "/",
    },
  ]);

  if (error) return <p>{error.message} :(</p>;
  if (loading) return <div className="item-wrapper">LOADING...</div>;

  const producers = data.Media.studios.nodes.filter(
    (studio) => !studio.isAnimationStudio
  );
  return (
    <div className="detail">
      <div
        className="banner-image w-full h-52 lg:h-72 flex flex-col justify-end"
        style={{
          background: `url(${data.Media.bannerImage})`,
          boxShadow: "none",
        }}
      >
        <div className="shadow  w-full h-1/3 bg-gradient-to-t from-gray-900 opacity-90 to-transparent"></div>
      </div>

      <div className="bg-gray-800 px-5 h-max lg:px-40">
        <div className="header h-min block lg:flex">
          <div className="overflow-visible relative flex justify-between lg:justify-start lg:flex-col">
            <img
              className="h-40 w-28 lg:h-80 lg:w-60 -mt-24 lg:-mt-60 lg:mb-5 lg:h object-cover"
              src={data.Media.coverImage.extraLarge}
              alt="Cover Image"
            />
            <div className="flex w-max lg:w-60">
              <button className="rounded bg-blue-400 text-blue-50 py-1 mr-4 px-16 lg:px-0 lg:w-full h-10 self-end lg:self-start">
                Add To List
              </button>
              <button className="rounded bg-red-500 text-blue-50 py-1 px-3 h-10 self-end lg:self-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="det">
            <div className="media-title font-semibold text-gray-200 py-5 lg:px-5">
              {data.Media.title.userPreferred}
            </div>
            <div
              className="desctription px-5 pb-5 hidden lg:block text-sm text-gray-500 hover:text-gray-400"
              dangerouslySetInnerHTML={{ __html: data.Media.description }}
            ></div>
          </div>
        </div>
        <div className="content pb-5 text-gray-300">
          <div className="navigation w-min mt-5 mx-auto text-xs font-semibold">
            {navigation.map((item) => (
              <Link to={item.to} className="px-3 hover:text-blue-400">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="content bg-gray-900 p-5 block lg:flex justify-between lg:px-40">
        <div className="info lg:w-1/5">
          <div className="bg-gray-800 p-3 flex lg:block overflow-x-auto lg:overflow-hidden lg:whitespace-normal text-xs whitespace-nowrap mb-5">
            {data.Media.airingSchedule.nodes.length > 0 ? (
              <div className="info-item mr-5 lg:mb-3">
                <div className="label text-gray-300">Airing</div>
                <div className="item text-blue-500 text-sm">
                  {`Ep. ${
                    data.Media.airingSchedule.nodes[0]?.episode
                  } ${moment
                    .unix(data.Media.airingSchedule.nodes[0]?.airingAt)
                    .fromNow()}`}
                </div>
              </div>
            ) : null}

            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Format</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.format}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Episodes</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.episodes}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Episode Duration</div>
              <div className="item text-gray-200 text-sm">
                {`${data.Media.duration} mins`}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Episode Duration</div>
              <div className="item text-gray-200 text-sm">
                {`${data.Media.duration} mins`}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Status</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.status}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Start Date</div>
              <div className="item text-gray-200 text-sm">
                {moment(
                  `${data.Media.startDate.year}${data.Media.startDate.month}${data.Media.startDate.day}`,
                  "YYYYMMDD"
                )
                  .format("LL")
                  .toString()}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Season</div>
              <div className="item text-gray-200 text-sm">
                {`${data.Media.season} ${data.Media.seasonYear}`}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Average Score</div>
              <div className="item text-gray-200 text-sm">
                {`${data.Media.averageScore}%`}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Popularity</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.popularity}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Favourites</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.favourites}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Studios</div>
              <div className="item text-gray-200 text-sm">
                {
                  data.Media.studios.nodes.find(
                    (studio) => studio.isAnimationStudio
                  ).name
                }
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Producers</div>
              <div className="item text-gray-200 text-sm flex lg:block">
                {producers.map((stud, idx) => (
                  <div className="mr-1">
                    {stud.name + (idx === producers.length - 1 ? "" : ",")}
                  </div>
                ))}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Hashtag</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.hashtag}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Genres</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.genres.join(", ")}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Romaji</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.title.romaji}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">English</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.title.english}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3">
              <div className="label text-gray-300">Native</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.title.native}
              </div>
            </div>
            <div className="info-item mr-5 lg:mb-3 pr-5">
              <div className="label text-gray-300">Synonyms</div>
              <div className="item text-gray-200 text-sm">
                {data.Media.synonyms.join(", ")}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          <Switch>
            <Route exact path="/anime/:id">
              <Overview id={match.params.id} />
            </Route>
            <Route path={`/anime/:id/watch`}>
              <Watch id={match.params.id} />
            </Route>
            <Route path={`${url}/characters`}>
              <Character id={match.params.id} />
            </Route>
            <Route path={`${url}/staff`}>
              <Staff id={match.params.id} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Detail;
