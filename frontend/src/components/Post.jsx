import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  return (
    <>
      <Card style={{ width: "20rem", margin: "10px" }}>
        <Link to={`/post/${post._id}`}>
          <Card.Img src={post.image} variant="top" />
        </Link>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.category}</Card.Text>

          <Card.Text>
            <div
              dangerouslySetInnerHTML={{
                __html: post.description,
              }}
            />
          </Card.Text>
          <Card.Text>{post.user.name}</Card.Text>
          <Card.Text>{post.user.email}</Card.Text>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <LinkContainer to={`/post/${post._id}`}>
              <Button variant="light" className="btn-sm">
                <AiOutlineLike />
              </Button>
            </LinkContainer>
            <LinkContainer to={`/post/${post._id}`}>
              <Button variant="light" className="btn-sm">
                Details
              </Button>
            </LinkContainer>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Post;
