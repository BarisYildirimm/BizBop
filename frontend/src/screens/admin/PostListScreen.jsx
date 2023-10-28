import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Form } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostToPublicMutation,
} from "../../slices/postsSlice";
import { toast } from "react-toastify";

const PostListScreen = () => {
  const { data: posts, refetch, isLoading, error } = useGetPostsQuery();
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation();
  const [updatePostToPublic, { isLoading: loadingUpdate }] =
    useUpdatePostToPublicMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deletePost(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleChange = async (e, postId) => {
    const sw = e.target.checked;

    try {
      await updatePostToPublic({
        postId,
        sw,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Post updated");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <h1>Posts</h1>
      {loadingDelete && <Loader />}
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>User</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>DATE</th>
              <th>Like</th>
              <th>Public</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr>
                <td>{post.user.name}</td>
                <td>
                  <div style={{ height: "100px", overflow: "scroll" }}>
                    {post.title}
                  </div>
                </td>
                <td>
                  <div
                    style={{ height: "100px", overflow: "scroll" }}
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  />
                </td>
                <td>{post.category}</td>
                <td>{post.createdAt.substring(0, 10)}</td>

                <td>{post.likeCount}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <Form style={{ textAlign: "center" }}>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      defaultChecked={post.isPublic}
                      onChange={(e) => handleChange(e, post._id)}
                    />
                  </Form>
                </td>
                <td>
                  <LinkContainer to={`/post/${post._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(post._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
                <td>
                  <LinkContainer to={`/post/${post._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PostListScreen;
