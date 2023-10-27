import React from "react";
import { Row, Col } from "react-bootstrap";
import Post from "../components/Post.jsx";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useGetPostsQuery } from "../slices/postsSlice.js";

const HomeScreen = () => {
  // isloading ve is Error eklenmez ise hata düşüyor ....
  const { data: posts, isLoading, error } = useGetPostsQuery();

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
          <h1>Latest Products</h1>
          <Row>
            {posts.map((post) => (
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
