import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import {
  AuthWrapper,
  FormContainer,
  Form,
  TopField,
  OtherField,
  Label,
  InputWrapper,
  Input,
  Error,
  ButtonWrapper,
  Button,
  AnnounceWrapper,
  Announce,
} from "../../../styles/Auth/AuthStyle";
import AxiosWrapper from '../../../request/AxiosWrapper';
import { StateAuthContext } from '../../../context/AuthContext';

const EditProfileWrapper = styled.div`
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

const FormWrapper = styled.div`
  margin: 0 auto;
  width: 25em;
  height: 37.5em;
`;

const Textarea = styled.textarea`
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

const CancelButton = styled.button`
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



function EditProfile() {
  const navigate = useNavigate()
  const [name_unique, setNameUnique] = useState(true)
  const [user, setUser] = useState({
    nickname: null,
    name: null,
    biography: null
  })
  const { state } = useContext(StateAuthContext);
  const name = state.name ? state.name : navigate(-1)
  
  const getUser = () => {
    AxiosWrapper.get("/user/users", {
      params: {
        name: name,
      },
    })
      .then((resp) => {
        console.log(resp);
        setUser({
          id: resp.data.id,
          nickname: resp.data.nickname,
          name: resp.data.name,
          biography: resp.data.biography
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser()
  }, [name])

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = {
      nickname: user.nickname,
      name: user.name,
      biography: user.biography
    }
    AxiosWrapper.patch(`/user/users/${user.id}`, { user: params }, { withCredentials: true })
    .then((resp) => {
      console.log(resp)
      navigate(`/${name}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleChange = (event) => {
    if (event.target.name === "name") {
      const check_data = {
        name: event.target.name,
        value: event.target.value
      }

      AxiosWrapper.post("/auth/check", { check_data })
      .then((resp) => {
        !resp.data.uniqueness ? setNameUnique(false) : setNameUnique(true)
      })
    }
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const handleCancel = () => {
    navigate(`/${name}`)
  }


  return (
    <EditProfileWrapper>
      <FormWrapper>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <TopField>
              <Label>名前</Label>
              <InputWrapper>
                <Input
                  onChange={handleChange}
                  type="text"
                  value={user.nickname}
                  placeholder="ズメズメ"
                  name="nickname"
                  maxLength="10"
                />
              </InputWrapper>
            </TopField>
            <OtherField>
              <Label>ユーザーID</Label>
              <InputWrapper>
                <Input
                  onChange={handleChange}
                  type="text"
                  value={user.name}
                  placeholder="zume"
                  name="name"
                  minLength="3"
                  maxLength="10"
                  required
                />
              </InputWrapper>
            </OtherField>
            {!name_unique && <Error>既に使われています</Error>}
            <OtherField>
              <Label>自己紹介</Label>
              <InputWrapper>
                <Textarea
                  onChange={handleChange}
                  type="text"
                  value={user.biography}
                  placeholder="好きな作家、好きな小説、趣味などを書いてみよう！"
                  name="biography"
                />
              </InputWrapper>
            </OtherField>
            <ButtonWrapper>
              <Button>保存</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <CancelButton onClick={handleCancel}>キャンセル</CancelButton>
            </ButtonWrapper>
          </Form>
        </FormContainer>
      </FormWrapper>
    </EditProfileWrapper>
  )
}

export default EditProfile