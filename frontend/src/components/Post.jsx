import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/posts/${post._id}`}>
          <Card.Img src={post.image} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/post/${post._id}`}>
            <Card.Title as="div">
              <strong>{post.title}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="h3">${post.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Post;
