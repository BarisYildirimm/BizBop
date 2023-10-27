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
          <section className="singlePage">
            <div className="container">
              <div className="left">
                <img src={post.image} alt="" />
              </div>
              <div className="right">
                <h1>{post.title}</h1>
                <p>{post.category}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.description,
                  }}
                />
                <p>{post.user.name}</p>
                <div>{post.user.email}</div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default DetailsScreen;
