import styled from "@emotion/styled";

export const PostListPageWrapper = styled.div`
  padding: 50px 0;
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

  .new-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    transition-property: opacity, visibility;
    transition-duration: 500ms;
    transition-timing-function: ease-in-out;
    opacity: ${(props) => (props.showButton ? 1 : 0)};
    visibility: ${(props) => (props.showButton ? "visible" : "hidden")};
    pointer-events: ${(props) => (props.showButton ? `auto` : `none`)};
    padding: 24px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);
    cursor: move;

    button {
      padding: 0;
      pointer-events: ${(props) => (props.showButton ? `auto` : `none`)};
      &:hover:enabled {
        color: navy;
      }
    }
  }
`;

export const ButtonReload = styled.button`
  margin-left: auto;
  width: 120px;
`;
