import styled from "@emotion/styled";

export const PostListPageWrapper = styled.div`
  /* height: 100vh; */

  .post-list {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    li {
      box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      overflow: hidden;
    }
  }
`;
