import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import {
  useCreatePostMutation,
  useUploadProductImageMutation,
} from "../slices/postsSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import { toast } from "react-toastify";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const items = ["Technology", "Travel", "Books", "Project"];

  const handleSelect = (event) => {
    setCategory(event.target.value);
  };

  const handleCKeditorState = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const [createPost, { isLoading: loadingCreate }] = useCreatePostMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      //unwrap eklenmediği için hata veriyordu backende veri gitmiyordu
      await createPost({ title, category, description, image }).unwrap();
      toast.success("Post Created");
      navigate(-1);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      {loadingCreate && <Loader />}
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
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Form.Control
            label="Choose File"
            onChange={uploadFileHandler}
            type="file"
          ></Form.Control>
          {loadingUpload && <Loader />}
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
        <CKEditor editor={ClassicEditor} onChange={handleCKeditorState} />
        <Button
          style={{ marginTop: "10px", float: "right" }}
          type="submit"
          variant="primary"
        >
          Publish
        </Button>
      </Form>
    </>
  );
};

export default CreateScreen;
