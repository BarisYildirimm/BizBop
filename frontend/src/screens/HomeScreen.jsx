import React from "react";
import { Row, Col } from "react-bootstrap";
import posts from "../posts.js";
import Post from "../components/Post.jsx";
const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {posts.map((post) => (
          <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
            <Post post={post} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
