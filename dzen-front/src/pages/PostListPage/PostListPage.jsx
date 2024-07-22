import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "antd";
import { ExclamationCircleOutlined, FormOutlined } from "@ant-design/icons";
import { paramsToObject } from "../../utils";
import { usePosts } from "../../hooks/usePosts";
import { MessageCard } from "../../components/MessageCard/MessageCard";
import { ButtonReload, PostListPageWrapper } from "./PostLisPage.styled";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { useDragger } from "../../hooks";
import { PostMessageForm } from "../../components/PostMessageForm";
import { Container } from "../../components/Container";

export function PostListPage() {
  const {
    data: { posts, pageCount, postCount, limit, page },
  } = useLoaderData();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [
    postList,
    setPostList,
    loadChildPosts,
    setChildExpand,
    setChildLoaded,
    rootNeedUpdate,
    // loading,
    // error,
  ] = usePosts();
  const [newMessage, setNewMessage] = useState(false);

  useDragger("new-message-button", true);

  useEffect(() => {
    setPostList(posts);
    window.scrollTo(0, 0);
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

  const handleCloseAfterSubmit = () => {
    setNewMessage(false);
    navigate("/");
  };

  return (
    <PostListPageWrapper showButton={!newMessage}>
      <Container>
        <FilterPanel
          {...paramsToObject(searchParams)}
          onChange={setSearchParams}
        >
          {rootNeedUpdate && (
            <ButtonReload
              type="button"
              title="root updated"
              onClick={() => navigate("/")}
            >
              <ExclamationCircleOutlined
                style={{ fontSize: 24, color: "red", marginLeft: "auto" }}
              />
            </ButtonReload>
          )}
        </FilterPanel>
        {newMessage && (
          <PostMessageForm
            handleClose={handleClose}
            handleCloseAfterSubmit={handleCloseAfterSubmit}
          />
        )}
        <ul className="post-list">
          {postList &&
            postList.map((elem) => (
              <li key={elem.id}>
                <MessageCard
                  data={elem}
                  getChildPosts={loadChildPosts}
                  setChildExpand={setChildExpand}
                  setChildLoaded={setChildLoaded}
                />
              </li>
            ))}
        </ul>
        {pageCount > 1 && (
          <Pagination
            style={{
              fontSize: "24px",
              margin: "30px 0",
              justifyContent: "center",
            }}
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
      </Container>
    </PostListPageWrapper>
  );
}
