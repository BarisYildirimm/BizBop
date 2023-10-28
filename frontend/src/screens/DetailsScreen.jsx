import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostDetailsQuery } from "../slices/postsSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const DetailsScreen = () => {
  const { id: postId } = useParams();

  const { data: post, isLoading, error } = useGetPostDetailsQuery(postId);

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
          <section style={{ margin: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
                borderRadius: "25px",
                padding: "50px",
              }}
            >
              <h1 style={{ fontWeight: "bolder" }}>{post.title}</h1>
              <div>{post.category}</div>
              <div>{post.user.name.toUpperCase()}</div>
              <div>{post.createdAt.substring(0, 10)}</div>
              <img
                src={post.image}
                alt=""
                style={{
                  height: "auto",
                  width: "50%",
                  margin: "20px",
                  borderRadius: "15px",
                  imageRendering: "pixelated",
                }}
              />

              <div
                dangerouslySetInnerHTML={{
                  __html: post.description,
                }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default DetailsScreen;
