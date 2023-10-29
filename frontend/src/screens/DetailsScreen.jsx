import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Row, Col, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useGetPostDetailsQuery,
  useCreateReviewMutation,
} from "../slices/postsSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import DarkMode from "../components/DarkMode";
import Rating from "../components/Rating";
import { toast } from "react-toastify";

const DetailsScreen = () => {
  const { id: postId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: post,
    refetch,
    isLoading,
    error,
  } = useGetPostDetailsQuery(postId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingPostReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        postId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="detailsContainer"
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                boxShadow: "1px 1px 9px 5px rgba(0, 0, 0, 0.5)",
                borderRadius: "25px",
                padding: "25px",
              }}
            >
              <DarkMode />
              <h1 style={{ fontWeight: "bolder", textAlign: "center" }}>
                {post.title}
              </h1>
              <div>{post.category}</div>
              <div>{post.user.name.toUpperCase()}</div>
              <div>{post.createdAt.substring(0, 10)}</div>
              <img
                src={post.image}
                alt=""
                style={{
                  height: "auto",
                  width: "75%",
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
          </div>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {post.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {post.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingPostReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingPostReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default DetailsScreen;
