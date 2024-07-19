import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
// import { EventCard } from "../../components/EventCard/EventCard";

// import { SortPanel } from "../../components/SortPanel/SortPanel";
import { paramsToObject } from "../../utils";
// import { EventListWrapper } from "./EventListPage.styled";
// import { Pagination } from "antd";
import { usePosts } from "../../hooks/usePosts";
import { Pagination } from "antd";
import { useEffect } from "react";
import { MessageCard } from "../../components/MessageCard/MessageCard";
import { PostListPageWrapper } from "./PostLisPage.styled";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";

export function PostListPage() {
  const {
    data: { posts, pageCount, postCount, limit, page },
  } = useLoaderData();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [postList, setPostList, loadChildPosts, setChildExpand] = usePosts();

  useEffect(() => {
    setPostList(posts);
    console.log("from hook", posts);
  }, [setPostList, posts]);

  // let currentPage = parseInt(searchParams.get("page"));
  // if (isNaN(currentPage)) {
  //   currentPage = 1;
  // }

  console.log({ postCount, limit, page, pageCount, postList, posts });

  //   const handleView = (id) => {
  //     navigate(`event/${id}`, { state: { back: true } });
  //   };

  //   const handleRegister = (id) => {
  //     navigate(`registration/${id}`, { state: { back: true } });
  //   };

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

  return (
    <PostListPageWrapper>
      <div>Post list Page</div>
      <FilterPanel
        {...paramsToObject(searchParams)}
        onChange={setSearchParams}
      />
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
      <Pagination
        rootClassName="pag"
        onChange={handleChangePage}
        current={page}
        pageSize={limit}
        total={postCount}
        showSizeChanger={false}
      />
    </PostListPageWrapper>
    // <EventListWrapper>
    //   <div>
    //     <SortPanel
    //       onChange={setSearchParams}
    //       {...paramsToObject(searchParams)}
    //     />
    //   </div>
    //   <ul className="list">
    //     {data?.map(
    //       ({ id, _id, title, description, organizer, event_date: time }) => (
    //         <li key={id}>
    //           <EventCard
    //             id={id}
    //             _id={_id}
    //             title={title}
    //             description={description}
    //             time={time}
    //             organizer={organizer}
    //             onRegister={handleRegister}
    //             onView={handleView}
    //           ></EventCard>
    //         </li>
    //       )
    //     )}
    //   </ul>

    //   <Outlet />
    // </EventListWrapper>
  );
}
