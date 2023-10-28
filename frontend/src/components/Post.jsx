import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  return (
    <>
      <Card
        style={{
          minWidth: "15rem",
          height: "98%",
          padding: "10px",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <Link style={{ textDecoration: "none" }} to={`/post/${post._id}`}>
          <Card.Img
            src={post.image}
            variant="top"
            style={{
              height: "15rem",
              borderRadius: "10px",
            }}
          />

          <Card.Body>
            <Card.Title style={{ fontWeight: "bold" }}>{post.title}</Card.Title>
            <Card.Text>{post.category}</Card.Text>

            <Card.Text style={{ height: "100px", overflow: "scroll" }}>
              <p
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
        </Link>
      </Card>
    </>
  );
};

export default Post;
