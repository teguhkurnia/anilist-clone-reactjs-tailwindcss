import React from "react";
import { gql, useQuery } from "@apollo/client";
import CharacterLists from "./CharacterLists";

const Character = ({ id }) => {
  const CHAR = gql`
    query($id: Int) {
      Media(id: $id) {
        characters(sort: ROLE) {
          edges {
            role
            voiceActors(language: JAPANESE) {
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
      }
    }
  `;
  const { loading, error, data } = useQuery(CHAR, {
    variables: {
      id,
    },
  });

  if (error) return <p>{error.message} :(</p>;
  if (loading) return <div className="item-wrapper">LOADING...</div>;
  const { characters } = data.Media;
  return <CharacterLists characters={characters} />;
};

export default Character;
