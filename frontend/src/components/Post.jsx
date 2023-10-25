import React from "react";
import { Card, Button } from "react-bootstrap";

const Post = ({ post }) => {
  return (
    <>
      <Card style={{ width: "20rem", margin: "10px" }}>
        <Card.Img
          variant="top"
          src={post.image}
          style={{ height: "15rem", padding: "3px" }}
        />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.category}</Card.Text>
          <Card.Text>{post.description}</Card.Text>
          <Card.Text>{post.User}</Card.Text>
          <Button variant="primary">Tıkla</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Post;
