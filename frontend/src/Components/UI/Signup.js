import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  const history = useHistory();

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPhoto = async () => {
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

  const uploadFields = async () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: "invalid email format",
        classes: "#b71c1c red darken-4",
      });
      return;
    }
    try {
      const newUser = await fetch("/api/v1/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          email,
          photo: url,
        }),
      });
      const data = await newUser.json();
      if (data.error) {
        M.toast({ html: data.error, classes: "#b71c1c red darken-4" });
      } else {
        M.toast({ html: data.message, classes: "#43a047 green darken-1" });
        history.push("/signin");
      }
      console.log("data", data);
    } catch (e) {
      console.log(e);
    }
  };

  const createUser = async () => {
    if (image) {
      uploadPhoto();
    } else {
      uploadFields();
    }
  };

  return (
    <div className="login-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={() => createUser()}
        >
          Signup
        </button>
        <h5>
          <Link to="/signin">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
