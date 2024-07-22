export const idIsPresent = (items, id) => {
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

export const getNewPostFunc = (parentId, newPostData) => {
  const fn = (posts) => {
    if (!idIsPresent(posts, parentId)) {
      return posts;
    }
    return getIterateFunction(
      (elem) => elem.childListLoaded && elem.id === parentId,
      (elem) => ({
        ...elem,
        childList: [
          {
            ...newPostData.post,
            user: newPostData.user,
            childListLoaded: false,
            childListExpanded: false,
            childList: [],
          },
          ...elem.childList,
        ],
      })
    )(posts);
  };
  return fn;
};

export const getChildCountUpdateFunc = (id, answerCountData) => {
  const fn = (posts) => {
    if (!idIsPresent(posts, id)) {
      return posts;
    }
    const treeRec = getIterateFunction(
      (elem) => elem.id === id,
      (elem) => ({
        ...elem,
        answers_count: answerCountData,
      })
    );
    return treeRec(posts);
  };
  return fn;
};

export const getSetChildExpandFn = (id, flag) =>
  getIterateFunction(
    (elem) => elem.id === id,
    (elem) => ({
      ...elem,
      childListExpanded: flag,
    })
  );

export const getSetChildPostsFunc = (id, newPostList) =>
  getIterateFunction(
    (elem) => elem.id === id,
    (elem) => ({
      ...elem,
      childListLoaded: true,
      childListExpanded: true,
      childList: newPostList,
      answers_count: {
        ...elem.answers_count,
        amount: newPostList.length,
      },
    })
  );

export const getSetChildLoadedFn = (id, flag) =>
  getIterateFunction(
    (elem) => elem.id === id,
    (elem) => ({
      ...elem,
      childListLoaded: flag,
    })
  );
