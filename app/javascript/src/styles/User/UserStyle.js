import styled from "styled-components"

// Profile.js
export const ProfileWrapper = styled.div`
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

  display: block;
  padding: 1em 10em;
  border-bottom: solid 0.1px #c0c0c0;
`;

export const ProfileContainer = styled.div`
  width: 65%;
  margin: 0 auto;
`

export const IconWrapper = styled.div`
  display: block;
`

export const UserWrapper = styled.div`
  display: block;
  width: 100%;
`

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;

export const UserInfo = styled.div`

`
export const ButtonWrapper = styled.div`
  
`;

export const Button = styled.div`
  font-size: 0.75em;
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 0.1em 1em;
  color: #aaa;

  &:hover {
    cursor: pointer;
    border: 1px solid #333;
    color: #333;
  }
`;

export const Name = styled.div`
  display: block;
  font-size: 1.5em;
  font-weight: bold;
`

export const Id = styled.div`
  display: block;
  font-size: 0.875em;
  color: #777;
`;

// WorkList.js
export const WorkListWrapper = styled.div`
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

  display: block;
  padding: 1em 10em;
  margin-top: 2em;
`;

export const WorkWrapper = styled.div`
  width: 65%;
  margin: 0 auto 2.5em auto;
`;

export const Work = styled.div`
  padding: 0 1em;
  border-left: solid 10px #96514d;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: #f8f8f8;
  }
`;
export const Header = styled.header``;

export const Author = styled.div`
  display: inline-block;
  font-size: 0.875em;
  padding-right: 0.5em;
  color: #777;
`;

export const PostTime = styled.div`
  display: inline-block;
  font-size: 0.75em;
  color: #777;
`;

export const Title = styled.div`
  font-size: 1.125em;
  font-weight: bold;
  letter-spacing: 0.02em;
`;

// EditProfile.js
export const EditProfileWrapper = styled.div`
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
  margin-top: 4em;
`;

export const FormWrapper = styled.div`
  margin: 0 auto;
  width: 25em;
  height: 37.5em;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 15em;
  outline: none;
  border-radius: 5px;
  border: solid 1px #e8e8e8;

  &:focus {
    border: solid 1px #96514d;
  }

  &::placeholder {
    color: #dcdcdc;
  }
`;

export const CancelButton = styled.button`
  width: 100%;
  height: 2.5em;
  padding: 0.5em;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background: #fff;
  border: solid 1px #96514d;
  color: #96514d;

  &:hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }
`;