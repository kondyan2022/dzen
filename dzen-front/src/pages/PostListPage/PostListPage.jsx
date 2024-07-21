import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { paramsToObject } from "../../utils";

import { usePosts } from "../../hooks/usePosts";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { MessageCard } from "../../components/MessageCard/MessageCard";
import { PostListPageWrapper } from "./PostLisPage.styled";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { FormOutlined } from "@ant-design/icons";
import { useDragger } from "../../hooks";
import { PostMessageForm } from "../../components/PostMessageForm";

export function PostListPage() {
  const {
    data: { posts, pageCount, postCount, limit, page, sort },
  } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  const [postList, setPostList, loadChildPosts, setChildExpand] = usePosts();
  const [newMessage, setNewMessage] = useState(false);

  useDragger("new-message-button", true);

  useEffect(() => {
    setPostList(posts);
  }, [setPostList, posts]);

  const handleChangePage = (page) => {
    setSearchParams((prev) => {
      const params = paramsToObject(prev);
      params.page = page;
      if (params.page === 1) {
        delete params.page;
      }
      return params;
    });
  };

  const handleClose = () => {
    setNewMessage(false);
  };

  return (
    <PostListPageWrapper showButton={!newMessage}>
      <FilterPanel
        {...paramsToObject(searchParams)}
        onChange={setSearchParams}
      />
      {newMessage && <PostMessageForm handleClose={handleClose} />}
      <ul className="post-list">
        {postList &&
          postList.map((elem) => (
            <li key={elem.id}>
              <MessageCard
                data={elem}
                getChildPosts={loadChildPosts}
                setChildExpand={setChildExpand}
              />
            </li>
          ))}
      </ul>
      {pageCount > 1 && (
        <Pagination
          rootClassName="pag"
          onChange={handleChangePage}
          current={page}
          pageSize={limit}
          total={postCount}
          showSizeChanger={false}
        />
      )}

      <div className="new-message" id="new-message-button">
        <button
          type="button"
          title="New message"
          onClick={() => {
            setTimeout(() => window.scrollTo(0, 0), 200);
            setNewMessage(true);
          }}
          disabled={newMessage}
        >
          <FormOutlined style={{ fontSize: 30 }} />
        </button>
      </div>
    </PostListPageWrapper>
  );
}
