import styled from "@emotion/styled";

export const ContainerWrapper = styled.div`
  width: 100%;
  min-width: 320px;
  /* max-width: 375px; */
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    max-width: 768px;
    padding-left: 32px;
    padding-right: 32px;
  }
  /* @media screen and (min-width: 1024px) {
    max-width: 1024px;
    padding-left: 32px;
    padding-right: 32px;
  } */

  @media screen and (min-width: 1280px) {
    max-width: 1280px;
    padding-left: 24px;
    padding-right: 24px;
  }
  /* @media screen and (min-width: 1440px) {
    max-width: 1440px;
    padding-left: 20px;
    padding-right: 20px;
  } */
`;
