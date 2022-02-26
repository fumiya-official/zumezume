import styled from 'styled-components'

export const WorkWrapper = styled.div`
  @media only screen and (max-width: 480px) {
    /* モバイルフォン */
    font-size: 12px;
  }

  @media only screen and (min-width: 480px) and (max-width: 1024px) {
    /* タブレット */
    font-size: 14px;
  }

  @media only screen and (min-width: 1024px) {
    /* PC */
    font-size: 16px;
  }
  font-family: Hiragino Mincho ProN;
`;

// 横書き
export const HorizontalWorkWrapper = styled.div`
  div {
    display: block;
  }

  [contenteditable="true"]:empty:before {
    content: attr(data-placeholder);
    color: #e0e0e0;
  }
`;

export const HorizontalTitleWrapper = styled.div`
  margin: 2.2em auto;
  &:hover {
    cursor: text;
  }
`;

export const HorizontalTitle = styled.div`
  max-width: 30em;
  font-size: 1.25em;
  letter-spacing: 0.05em;
  margin: 0 auto;
  padding: 0;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export const HorizontalContentWrapper = styled.div`
  width: 31.25em;
  height: ${(props) => props.lines !== undefined ? (props.lines + 1) * 1.875 : 37.5}em;
  margin: auto;
  position: relative;
`;

export const HorizontalManuscriptPaper = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  width: 31.25em; // background-sizeの左右*20
  height: ${(props) => props.lines !== undefined ? (props.lines + 1) * 1.875 : 37.5}em;
  background-image: linear-gradient(
      to bottom,
      #ffffff,
      #ffffff 10%,
      #96514d 11%,
      #96514d 12%,
      transparent 13%,
      transparent 87%,
      #96514d 88%,
      #96514d 89%,
      #ffffff 90%,
      #ffffff
    ),
    linear-gradient(
      to right,
      transparent,
      transparent 97%,
      #96514d 98%,
      #96514d
    );
  background-size: 1.5625em 1.875em;
  border: 1px solid #96514d;
`;

export const HorizontalContent = styled.div`
  position: absolute;
  width: 102%;
  z-index: 2;
  left: 51%;
  transform: translateX(-50%);
  text-align: left;
  font-size: 1.125em;
  line-height: 1.67em; /* 行間 */
  letter-spacing: 0.393em; /* 文字間 */
  margin: 0.1em 0 0 0.13em;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: text;
  }
`;

// 縦書き
export const VerticalWorkWrapper = styled.div`
  justify-content: center;
  margin: 4.5em auto;
  text-align: center;
  /* line-height: 35px;
  letter-spacing: 7px; */

  [contenteditable="true"]:empty:before {
    content: attr(data-placeholder);
    color: #e0e0e0;
  }
`;

export const VerticalContentWrapper = styled.div`
  display: inline-block;
  margin: auto;
  width: 43.75em;
  height: 34.375em;
  position: relative;
`;

export const VerticalManuscriptPaper = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  width: 43.75em;
  height: 31.5em;
  text-align: left;
  background-image: linear-gradient(
      to right,
      #ffffff,
      #ffffff 10%,
      #96514d 11%,
      #96514d 12%,
      transparent 13%,
      transparent 87%,
      #96514d 88%,
      #96514d 89%,
      #ffffff 90%,
      #ffffff
    ),
    linear-gradient(
      to bottom,
      transparent,
      transparent 97%,
      #96514d 98%,
      #96514d
    );
  background-size: 2.1875em 1.5625em;
  border: 2px solid #96514d;
`;

export const VerticalContent = styled.div`
  position: absolute;
  width: 43.75em;
  height: 28em;
  z-index: 2;
  left: 43.8%;
  transform: translateX(-50%);
  font-size: 1.125em;
  line-height: 1.95em; /* 行間 */
  letter-spacing: 0.393em; /* 文字間 */
  margin-top: 0.3em;
  /* 縦書き */
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  /* 上寄せ  */
  text-align: left;
  text-orientation: upright;
  &:hover {
    cursor: vertical-text;
  }

  &:focus {
    outline: none;
    cursor: vertical-text;
  }
`;

export const VerticalTitleWrapper = styled.div`
  display: inline-block;
  margin-left: 0.9375em;
  height: 28em;
  width: 2.3em;
  vertical-align: top;
  justify-content: center;
  align-items: center;
`;

export const VerticalTitle = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.25em;
  letter-spacing: 0.05em;
  margin-top: 0.1em;
  text-align: left;
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  text-orientation: upright;

  &:hover {
    cursor: vertical-text;
  }

  &:focus {
    outline: none;
    cursor: vertical-text;
  }

  ::placeholder {
    color: #c0c0c0;
  }
`;