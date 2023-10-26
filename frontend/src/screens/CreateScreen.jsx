import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const items = ["Öğe 1", "Öğe 2", "Öğe 3", "Öğe 4"];

  const handleSelect = (event) => {
    setCategory(event.target.value);
  };

  const handleCKeditorState = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      console.log(title);
      console.log("--------------------------------");
      console.log(category);
      console.log("--------------------------------");
      console.log(description);
      console.log("--------------------------------");
    } catch (error) {}
  };
  return (
    <>
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
