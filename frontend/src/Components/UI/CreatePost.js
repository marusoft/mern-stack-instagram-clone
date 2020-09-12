import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");


  const getUsersPost = async () => {
    try {
      const createUserPost = await fetch("/api/v1/createpost", {
         method: "post",
         headers: {
           "Content-Type": "application/json",
           "Authorization": "Bearer "+localStorage.getItem('jwt')
         },
         body: JSON.stringify({
           title,
           body,
           pic: url,
         }),
       });
       const data = await createUserPost.json();
       if (data.error) {
         M.toast({ html: data.error, classes: "#b71c1c red darken-4" });
       } else {
         M.toast({ html: data.message, classes: "#43a047 green darken-1" });
         history.push("/");
       }
     } catch (error) {
       console.log(error);
     }
  }

  useEffect(() => {
    if (url) {
      getUsersPost();
    }
   
  }, [url])

  const uploadDetails = async () => {
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
      const uploadData = await createUpload.json();
      setUrl(uploadData.url);
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Photo</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            placeholder="image"
          />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => uploadDetails()}
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
