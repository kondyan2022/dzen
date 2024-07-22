import styled from "@emotion/styled";
export const FilterPanelWrapper = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  .filter-button {
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
