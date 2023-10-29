import { POSTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: POSTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),
    getPostDetails: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyPost: builder.query({
      query: () => ({
        url: `${POSTS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePostToPublic: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}/public`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    getTopPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostDetailsQuery,
  useGetMyPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useUpdatePostToPublicMutation,
  useUploadProductImageMutation,
  useCreateReviewMutation,
  useGetTopPostsQuery,
  useDeletePostMutation,
} = postsApiSlice;
