import { POSTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: POSTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Posts"],
    }),
    getPostDetails: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostDetailsQuery } = postsApiSlice;
