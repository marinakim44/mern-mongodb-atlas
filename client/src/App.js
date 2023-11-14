import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((res) => {
        console.log("response from server", res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/submit", post)
      .then((res) => console.log("response from server", res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>MERN Tutorial</h1>
      <p>Create and read data with MERN + MongoDB Atlas</p>
      <input
        placeholder="Title"
        name="title"
        value={post.title}
        onChange={handleChange}
      />
      <input
        placeholder="Body"
        name="body"
        value={post.body}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Save to MongoDB Atlas</button>

      <p>Below are data from MongoDB Atlas</p>
      {posts &&
        posts.length > 0 &&
        posts.map((post, index) => {
          return (
            <div key={index}>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
