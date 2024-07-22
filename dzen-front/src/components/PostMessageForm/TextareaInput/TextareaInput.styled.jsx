import styled from "@emotion/styled";

export const EditorButton = styled.span`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    color: navy;
    transform: scale(1.2);
  }
`;

export const EditorButtonPanel = styled.span`
  display: inline-flex;
  padding-left: 20px;
  padding-right: 40px;
`;

export const TextViewerWrapper = styled.div`
  width: 80%;
  height: 80%;
  padding: 40px;
  border: 5px solid navy;
  font-size: 20x;
  background-color: white;
  border-radius: 5px;
  overflow-y: auto;
`;
