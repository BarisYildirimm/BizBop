import React, { useState, useEffect } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import Post from "../components/Post.jsx";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useGetPostsQuery } from "../slices/postsSlice.js";
import PostCarousel from "../components/PostCarousel.jsx";

const HomeScreen = () => {
  const [category, setCategory] = useState("");
  // isloading ve is Error eklenmez ise hata düşüyor ....
  const { data: posts, isLoading, error } = useGetPostsQuery();
  const items = ["Technology", "Travel", "Books", "Project"];
  const handleSelect = (item) => {
    setCategory(item);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <PostCarousel />
          <h1>Latest Posts</h1>
          <Nav className="me-auto">
            {items.map((item) => (
              <Nav.Link onClick={() => handleSelect(item)}>{item}</Nav.Link>
            ))}
          </Nav>
          <Row>
            {posts
              .filter((x) => (category ? x.category === category : true))
              .map((post) => (
                <>
                  {post.isPublic && (
                    <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                      <Post post={post} />
                    </Col>
                  )}
                </>
              ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
