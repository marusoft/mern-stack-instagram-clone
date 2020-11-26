import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [myPhotos, setMyPhotos] = useState([]);
  const [image, setImage] = useState("");
  // const [url, setUrl] = useState("");
  const { state, dispatch } = useContext(UserContext);

  const displayUserProfile = async () => {
    try {
      const getUserProfileToDisplay = await fetch("/api/v1/userpost", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const profileResult = await getUserProfileToDisplay.json();
      setMyPhotos(profileResult.myPosts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    displayUserProfile();
  }, []);

  useEffect(() => {
    if (image) {
      showUploadPhoto();
    }
  }, [image]);

  let uploadData;

  const showUploadPhoto = async () => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "instag-clone");
      data.append("cloud_name", "marusofteamwork");

      const createUpload = await fetch(
        "https://api.cloudinary.com/v1_1/marusofteamwork/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      uploadData = await createUpload.json();
    } catch (err) {
      console.log(err);
    }
    uploadUserProfilePhoto();
  };

  const uploadUserProfilePhoto = async () => {
    try {
      const getUserPhotoToDisplay = await fetch("/api/v1//updatephoto", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          photo: uploadData.url,
        }),
      });
      const photoResult = await getUserPhotoToDisplay.json();
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state, photo: photoResult.photo })
      );
      dispatch({ type: "UPDATEPHOTO", payload: photoResult.photo });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhoto = (file) => {
    setImage(file);
  };

  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "0px auto",
      }}
    >
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.photo : "Loading ..."}
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
              <h6>{state ? state.followers.length : 0} followers</h6>
              <h6>{state ? state.following.length : 0} following</h6>
            </div>
          </div>
        </div>

        <div
          className="file-field input-field"
          style={{
            margin: "10px",
          }}
        >
          <div className="btn #64b5f6 blue darken-1">
            <span>Update Photo</span>
            <input
              type="file"
              onChange={(e) => uploadPhoto(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="image"
            />
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
