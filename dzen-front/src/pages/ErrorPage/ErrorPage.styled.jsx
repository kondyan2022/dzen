import styled from "@emotion/styled";

export const ErrorPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  color: tomato;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  button {
    padding: 5px 10px;
    border-radius: 5px;
    border: 2px solid tomato;
  }
`;
