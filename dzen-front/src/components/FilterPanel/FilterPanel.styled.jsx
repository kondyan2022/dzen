import styled from "@emotion/styled";
export const FilterPanelWrapper = styled.div`
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  button {
    width: 180px;
    border: none;
    outline: none;

    &:hover,
    &:focus,
    &:active {
      color: navy;
      font-weight: 600;
      border: none;
      outline: none;
    }
  }
`;
