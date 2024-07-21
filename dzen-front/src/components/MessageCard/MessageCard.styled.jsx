import styled from "@emotion/styled";

export const MessageCardWrapper = styled.div`
  /* box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.02); */
  margin-left: ${(props) => `${!props.level ? 0 : 40}px`};
  margin-bottom: 20px;
`;

export const MessageTitle = styled.div`
  padding: 5px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #f9f9f9;
  div:first-of-type {
    font-weight: 600;
  }
  .reply-button {
    padding: 0;
  }
`;

export const ChildNavigator = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  button {
    width: 30px;
    height: 30px;
    padding: 0px;
    border-radius: 50%;
    text-align: center;
    transition: all 300ms linear;
    border: none;
    &:disabled {
      cursor: default;
    }
    &:hover:enabled {
      color: navy;
      transform: scale(1.3);
      outline: none;
    }
    &:focus,
    &:active {
      outline: none;
    }
  }
  span {
    min-width: 20px;
    text-align: center;
    font-weight: 600;
  }
`;

export const MessageText = styled.div`
  padding: 20px;
`;
