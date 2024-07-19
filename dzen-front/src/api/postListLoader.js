import { paramsToObject } from "../utils";
import { axiosInstance } from "./axiosInstance";
import { endpoints } from "./endpoints";

export async function postListLoader({ request }) {
  const url = new URL(request.url);
  const params = paramsToObject(url.searchParams);
  const { data } = await axiosInstance.get(endpoints.posts.getAll, { params });

  return { data };
}
