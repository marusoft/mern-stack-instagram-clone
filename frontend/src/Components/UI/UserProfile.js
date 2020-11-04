import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  console.log(userid);

  const displayUserProfile = async () => {
    try {
      const getUserProfileToDisplay = await fetch(
        `/api/v1/userprofile/${userid}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      const profileResult = await getUserProfileToDisplay.json();
      console.log(profileResult);
      setProfile(profileResult);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    displayUserProfile();
  }, []);
  return (
    <>
      {userProfile ? (
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
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src="https://images.unsplash.com/photo-1550927407-50e2bd128b81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                alt=""
              />
            </div>
            <div>
              <h4>{userProfile.findUser.name}</h4>
              <h5>{userProfile.findUser.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "108%",
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6>50 followers</h6>
                <h6>50 following</h6>
              </div>
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map((picture) => {
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
      ) : (
        <h2>Loading ...!</h2>
      )}
    </>
  );
};

export default Profile;
