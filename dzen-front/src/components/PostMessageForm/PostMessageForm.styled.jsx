import styled from "@emotion/styled";

export const PostMessageFormWrapper = styled.div`
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 0;
  margin-left: ${(props) => `${props.level * 40 + 20}px`};
  overflow: hidden;
  .form-title {
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    font-weight: 600;
    color: navy;
  }
  form {
    display: grid;
    grid-template-columns: 1fr 2fr;
    div {
      display: flex;
      flex-direction: column;
      padding: 20px;
      p {
        width: 100%;
        height: 16px;
        font-size: 12px;
      }
    }
    label {
      display: block;
      input,
      textarea {
        width: 100%;
        display: block;
        padding: 5px;
        margin-top: 3px;
      }
    }
    .hidden-element {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;
      white-space: nowrap;
      clip-path: inset(100%);
      clip: rect(0 0 0 0);
      overflow: hidden;
    }
    p {
      color: red;
    }
    button {
      width: auto;
    }
    .column-two {
      position: relative;
    }
    .add-file-label {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 24px;
      cursor: pointer;
      &:hover {
        color: navy;
        transform: scale(1.2);
      }
    }
    .captcha-send-wrapper {
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: top;

      .captcha-error-wrapper {
        padding: 0;

        .captcha {
          padding: 3px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          border: 1px solid lightblue;
          border-radius: 5px;
          align-items: center;
          label {
            display: flex;
          }
          input {
            width: 100px;
          }
          .captcha-image {
            width: 120px;
            height: 45px;
          }
          button {
            border: none;
            &:hover {
              color: navy;
              transform: scale(1.2);
            }
          }
        }
      }
    }
  }
`;

export const SubmitButton = styled.button`
  height: 52px;
  background-color: blue;
  color: white;
  flex: 1;
  font-weight: 600;
  transition: background-color 400ms ease-in-out;
  &:hover {
    background-color: navy;
  }
`;
