import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import { useCreatePostMutation } from "../slices/postsSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import { toast } from "react-toastify";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const items = ["Öğe 1", "Öğe 2", "Öğe 3", "Öğe 4"];

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
      await createPost({ title, category, description }).unwrap();
      toast.success("Post Created");
      navigate(-1);
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
