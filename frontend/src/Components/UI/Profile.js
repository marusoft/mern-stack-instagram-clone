import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [myPhotos, setMyPhotos] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  const displayUserProfile = async () => {
    try {
      const getUserProfileToDisplay = await fetch("/api/v1/userpost", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const profileResult = await getUserProfileToDisplay.json();
      // console.log(profileResult.myPosts);
      setMyPhotos(profileResult.myPosts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    displayUserProfile();
  }, []);
  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "0px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1550927407-50e2bd128b81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
            alt=""
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <h5>{state ? state.email : "loading"}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "108%",
            }}
          >
            <h6>{myPhotos.length} posts</h6>
            <h6>{ state ? state.followers.length: 0} followers</h6>
            <h6>{ state ? state.following.length: 0} following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {myPhotos.map((picture) => {
          return (
            <img
              key={picture._id}
              className="item"
              src={picture.photo}
              alt="my profile page posts photos"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
