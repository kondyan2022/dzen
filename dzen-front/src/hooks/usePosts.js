import { useCallback, useState } from "react";
import { getChildPosts } from "../api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);

  const setPostList = useCallback((postList) => {
    setPosts(
      postList.map((elem) => ({
        ...elem,
        childListLoaded: false,
        childListExpanded: false,
        childList: [],
      }))
    );
  }, []);
  //   console.log("from hook", posts);
  const setChildPosts = useCallback(async (id) => {
    try {
      const childPostList = await getChildPosts(id);
      if (childPostList.length) {
        const newList = childPostList.map((elem) => ({
          ...elem,
          childListLoaded: false,
          childListExpanded: false,
          childList: [],
        }));
        setPosts((prev) =>
          prev.map((elem) =>
            elem.id === id
              ? {
                  ...elem,
                  childListLoaded: true,
                  childListExpanded: true,
                  childList: newList,
                }
              : { ...elem }
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setChildExpand = useCallback((id, flag) => {
    setPosts((prev) =>
      prev.map((elem) =>
        elem.id === id
          ? {
              ...elem,
              childListExpanded: flag,
            }
          : { ...elem }
      )
    );
  }, []);

  return [posts, setPostList, setChildPosts, setChildExpand];
};
