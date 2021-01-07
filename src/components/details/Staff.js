import React from "react";
import { gql, useQuery } from "@apollo/client";
import StaffLists from "./StaffLists";

const Staff = ({ id }) => {
  const STAFF = gql`
    query($id: Int) {
      Media(id: $id) {
        staff {
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
      }
    }
  `;
  const { loading, error, data } = useQuery(STAFF, {
    variables: {
      id,
    },
  });

  if (error) return <p>{error.message} :(</p>;
  if (loading) return <div className="item-wrapper">LOADING...</div>;
  const { staff } = data.Media;
  return <StaffLists staffs={staff} />;
};

export default Staff;
