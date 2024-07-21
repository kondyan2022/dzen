import { useCallback, useEffect, useState } from "react";
import { API_URL, getChildPosts } from "../api";
import { io } from "socket.io-client";

const idIsPresent = (items, id) => {
  const iterateItems = (items) => {
    items.forEach((elem) => {
      if (elem.id === id) {
        throw elem;
      }
      if (elem.childList.length) {
        iterateItems(elem.childList);
      }
    });
  };

  try {
    iterateItems(items);
  } catch (e) {
    return e;
  }
};

const getIterateFunction = (conditionFunc, thenFunc) => {
  const fn = (items) =>
    items.map((elem) =>
      conditionFunc(elem)
        ? thenFunc(elem)
        : { ...elem, childList: fn(elem.childList) }
    );

  return fn;
};

// const addNewPostToState = (posts) =>
//   getIterateFunction(elem => (elem.childListLoaded && elem.id === parentId), elem=>({
//                   ...elem,
//                   childList: [
//                     {
//                       ...data.post,
//                       user: data.user,
//                       childListLoaded: false,
//                       childListExpanded: false,
//                       childList: [],
//                     },
//                     ...elem.childList,
//                   ],
//                 }))(posts)

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
      console.log(data);
      if (!parentId) {
        console.log("new post in root");
        setRootNeedUpdate(true);
        return;
      }
      setPosts((prev) => {
        if (!idIsPresent(prev, parentId)) {
          console.log("No parentId ");
          return prev;
        }
        const treeRec = (items) =>
          items.map((elem) =>
            elem.childListLoaded && elem.id === parentId
              ? {
                  ...elem,
                  childList: [
                    {
                      ...data.post,
                      user: data.user,
                      childListLoaded: false,
                      childListExpanded: false,
                      childList: [],
                    },
                    ...elem.childList,
                  ],
                }
              : { ...elem, childList: treeRec(elem.childList) }
          );

        const newState = treeRec(prev);
        console.log("new", newState);
        return newState;
      });
    });

    socket.on("child-count-update", (data) => {
      const { postId: id } = data;
      setPosts((prev) => {
        if (!idIsPresent(prev, id)) {
          console.log("No id count amount ");
          return prev;
        }
        const treeRec = (items) =>
          items.map((elem) =>
            elem.id === id
              ? {
                  ...elem,
                  answers_count: data,
                }
              : { ...elem, childList: treeRec(elem.childList) }
          );
        return treeRec(prev);
      });
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
                    answers_count: {
                      ...elem.answers_count,
                      amount: newList.length,
                    },
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
