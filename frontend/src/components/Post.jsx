import React from "react";
import { Card } from "react-bootstrap";
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
              objectFit: "cover",
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            ></div>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default Post;
