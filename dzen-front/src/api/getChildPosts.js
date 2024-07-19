import { axiosInstance } from "./axiosInstance";
import { endpoints } from "./endpoints";

export const getChildPosts = async (parentId) => {
  const { data } = await axiosInstance.get(
    endpoints.posts.getByParentId(parentId)
  );
  return data;
};
