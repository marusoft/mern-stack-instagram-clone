import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const [showFollow, setShowFollow] = useState(state?!state.following.includes(userid):true);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  // console.log(userid);

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

  // follower logic
  const displayUserFollower = async () => {
    try {
      const followUser = await fetch("/api/v1/follow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userid,
        }),
      });
      const userFollowerResult = await followUser.json();
      console.log(userFollowerResult);
      dispatch({
        type: "UPDATE",
        payload: {
          following: userFollowerResult.following,
          followers: userFollowerResult.followers,
        },
      });
      localStorage.setItem("user", JSON.stringify(userFollowerResult));
      setProfile((prevState) => {
        return {
          ...prevState,
          findUser: {
            ...prevState.findUser,
            followers: [
              ...prevState.findUser.followers,
              userFollowerResult._id,
            ],
          },
        };
      });
      setShowFollow(false);
    } catch (error) {
      console.log(error);
    }
  };

  // unfollow logic

  const displayUserUnFollower = async () => {
    try {
      const unFollowUser = await fetch("/api/v1/unfollow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          unfollowId: userid,
        }),
      });
      const userUnFollowerResult = await unFollowUser.json();
      dispatch({
        type: "UPDATE",
        payload: {
          following: userUnFollowerResult.following,
          followers: userUnFollowerResult.followers,
        },
      });
      localStorage.setItem("user", JSON.stringify(userUnFollowerResult));
      setProfile((prevState) => {
        const newFollower = prevState.findUser.followers.filter(
          (item) => item != userUnFollowerResult._id
        );
        return {
          ...prevState,
          findUser: {
            ...prevState.findUser,
            followers: newFollower,
          },
        };
      });
      setShowFollow(true);
    } catch (error) {
      console.log(error);
    }
  };

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
                <h6>{userProfile.findUser.followers.length} followers</h6>
                <h6>{userProfile.findUser.following.length} following</h6>
              </div>
              {showFollow ? (
                <button
                  style={{
                    margin: "10px",
                  }}
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => displayUserFollower()}
                >
                  Follow
                </button>
              ) : (
                <button
                  style={{
                    margin: "10px",
                  }}
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => displayUserUnFollower()}
                >
                  Unfollow
                </button>
              )}
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
