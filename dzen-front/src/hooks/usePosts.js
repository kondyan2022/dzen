import { useCallback, useEffect, useState } from "react";
import { API_URL, getChildPosts } from "../api";
import { io } from "socket.io-client";
import {
  getChildCountUpdateFunc,
  getNewPostFunc,
  getSetChildExpandFn,
  getSetChildLoadedFn,
  getSetChildPostsFunc,
} from "../utils/postDataFunction";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [rootNeedUpdate, setRootNeedUpdate] = useState(true);

  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(API_URL));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("new-post", (data) => {
      const parentId = data.post?.parentId;
      if (!parentId) {
        setRootNeedUpdate(true);
        return;
      }

      setPosts(getNewPostFunc(parentId, data));
    });

    socket.on("child-count-update", (data) => {
      const { postId: id } = data;
      setPosts(getChildCountUpdateFunc(id, data));
    });

    return () => {
      socket.off("new-post");
      socket.off("child-count-update");
    };
  }, [socket]);

  const setPostList = useCallback((postList) => {
    setRootNeedUpdate(false);
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
        setPosts(getSetChildPostsFunc(id, newList));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const setChildExpand = useCallback((id, flag) => {
    setPosts(getSetChildExpandFn(id, flag));
  }, []);

  const setChildLoaded = useCallback((id, flag) => {
    setPosts(getSetChildLoadedFn(id, flag));
  }, []);

  return [
    posts,
    setPostList,
    setChildPosts,
    setChildExpand,
    setChildLoaded,
    rootNeedUpdate,
    loading,
    error,
  ];
};
