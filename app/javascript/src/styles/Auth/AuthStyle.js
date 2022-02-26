import styled from 'styled-components'

export const AuthWrapper = styled.div`
  text-align: center;
  margin-top: 4.5em;
`;

export const FormWrapper = styled.div`
  margin: 0 auto;
  width: 20em;
  height: 30em;
  border: solid 5px rgba(155, 81, 77, 0.1);
  border-radius: 5px;
  padding: 1.5em;
`;

export const Title = styled.div`
  font-size: 0.875em;
  margin-bottom: 2.5em;
`;

export const FormContainer = styled.div``;

export const Form = styled.form``;

export const TopField = styled.div`
  width: 100%;
  display: block;
  text-align: left;
  margin: 0;
`;

export const OtherField = styled.div`
  width: 100%;
  display: block;
  text-align: left;
  margin: 1em 0 0 0;
`;

export const Label = styled.div`
  font-size: 1em;
  padding-bottom: 0.2em;
`;

export const Caption = styled.span`
  color: #c0c0c0;
  font-size: 0.8em;
`;

export const InputWrapper = styled.div``;

export const Input = styled.input`
  width: 100%;
  height: 2.5em;
  padding: 0.5em;
  background-color: white;
  box-sizing: border-box;
  border: solid 1px #e8e8e8;
  border-radius: 5px;

  &:focus {
    border: solid 1px #96514d;
    outline: none;
  }

  &::placeholder {
    color: #dcdcdc;
  }
`;

export const Error = styled.p`
  color: red;
  text-align: left;
  font-size: 0.625em;
  margin: 0.3em 0 1em 0;
  padding-left: 0.5em;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2em;
`;

export const Button = styled.button`
  width: 100%;
  height: 2.5em;
  padding: 0.5em;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background-color: #96514d;

  &:hover {
    background-color: #7a4340;
    cursor: pointer;
  }
`;

export const AnnounceWrapper = styled.div`
  margin: 1.5em 0;
`;

export const Announce = styled.div`
  color: #b8b8b8;
  a {
    font-size: 0.777em;
    color: #b8b8b8;
    text-decoration: underline;
  }
`;