import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  // display
  const displayUserPost = async () => {
    try {
      const getUserPostToDisplay = await fetch("/api/v1/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const postResult = await getUserPostToDisplay.json();
      setData(postResult.allPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayUserPost();
  }, []);

  // like
  const likePost = async (id) => {
    try {
      const likeUserPost = await fetch("/api/v1/likepost", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: id,
        }),
      });
      const likePostResult = await likeUserPost.json();

      const updateLikeData = data.map((item) => {
        if (item._id === likePostResult._id) {
          return likePostResult;
        } else {
          return item;
        }
      });

      setData(updateLikeData);
    } catch (error) {
      console.log(error);
    }
  };

  // unlike
  const unLikePost = async (id) => {
    try {
      const unLikeUserPost = await fetch("/api/v1/unlikepost", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: id,
        }),
      });
      const unLikePostResult = await unLikeUserPost.json();
      const updateLikeData = data.map((item) => {
        if (item._id === unLikePostResult._id) {
          return unLikePostResult;
        } else {
          return item;
        }
      });
      setData(updateLikeData);
    } catch (error) {
      console.log(error);
    }
  };

  // render
  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt="item post" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unLikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
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
