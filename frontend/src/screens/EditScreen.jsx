import React, { useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetPostDetailsQuery,
  useUpdatePostMutation,
} from "../slices/postsSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const EditScreen = () => {
  const { id: postId } = useParams();
  console.log(postId);

  const {
    data: post,
    refetch,
    isLoading,
    error,
  } = useGetPostDetailsQuery(postId);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setDescription(post.description);
    }
  }, [post]);

  const items = ["Technology", "Travel", "Books", "Project"];

  const handleSelect = (event) => {
    setCategory(event.target.value);
  };

  const navigate = useNavigate();

  const handleCKeditorState = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const [updatePost, { isLoading: loadingUpdate }] = useUpdatePostMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePost({
        postId,
        title,
        category,
        description,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Post updated");
      refetch();
      navigate(-1);
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
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2 center" controlId="name">
            <Form.Control
              className="text-center"
              type="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <InputGroup className="mb-3">
            <FormControl
              as="select"
              className="text-center"
              custom
              value={category}
              onChange={handleSelect}
            >
              <option>Category</option>
              {items.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </FormControl>
          </InputGroup>
          <CKEditor
            editor={ClassicEditor}
            onChange={handleCKeditorState}
            data={description}
          />
          <Button
            style={{ marginTop: "10px", float: "right" }}
            type="submit"
            variant="primary"
          >
            Publish
          </Button>
          {loadingUpdate && <Loader />}
        </Form>
      )}
    </>
  );
};

export default EditScreen;
