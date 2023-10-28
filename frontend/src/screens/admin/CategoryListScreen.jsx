import React from "react";
import { Table } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetCategoriesQuery } from "../../slices/categoriesSlice";

const CategoryListScreen = () => {
  const { data: categories, isloading, error } = useGetCategoriesQuery();
  
  return (
    <>
      {isloading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Categories</h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((x) => (
                <tr key={x._id}>
                  <td>{x._id}</td>
                  <td>{x.name}</td>
                  <td>{x.createdAt.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default CategoryListScreen;
