import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  const displayUserPost = async () => {
    try {
      const getUserPostToDisplay = await fetch("/api/v1/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const postResult = await getUserPostToDisplay.json();
      setData(postResult.allPosts)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    displayUserPost();
  }, []);

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img
                src={item.photo}
                alt="item post"
              />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
