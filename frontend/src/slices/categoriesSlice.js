import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";

const CategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/${data.categoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: "DELETE",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = CategoriesApiSlice;
