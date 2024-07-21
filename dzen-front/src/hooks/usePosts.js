import { useCallback, useState } from "react";
import { getChildPosts } from "../api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

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

  const setChildPosts = useCallback(async (id) => {
    setLoading(true);
    try {
      const childPostList = await getChildPosts(id);
      if (childPostList.length) {
        const newList = childPostList.map((elem) => ({
          ...elem,
          childListLoaded: false,
          childListExpanded: false,
          childList: [],
        }));
        console.log("from hook", newList);
        setPosts((prev) => {
          const treeRec = (items) =>
            items.map((elem) =>
              elem.id === id
                ? {
                    ...elem,
                    childListLoaded: true,
                    childListExpanded: true,
                    childList: newList,
                  }
                : { ...elem, childList: treeRec(elem.childList) }
            );

          return treeRec(prev);
        });
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const setChildExpand = useCallback((id, flag) => {
    setPosts((prev) => {
      const treeRec = (items) =>
        items.map((elem) =>
          elem.id === id
            ? {
                ...elem,
                childListExpanded: flag,
              }
            : { ...elem, childList: treeRec(elem.childList) }
        );
      return treeRec(prev);
    });
  }, []);

  return [posts, setPostList, setChildPosts, setChildExpand, loading, error];
};
