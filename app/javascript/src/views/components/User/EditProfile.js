import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
  FormContainer,
  Form,
  TopField,
  OtherField,
  Label,
  Caption,
  InputWrapper,
  Input,
  Error,
  ButtonWrapper,
  Button,
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
  const [invalid_input, setInvalidInput] = useState(false) // true: 無効な文字 false: 有効な文字
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

  useEffect(() => {
    if (state.auth) navigate("/works")
  }, [])

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
      if (!event.target.value.match(/^[0-9a-zA-Z\\_]*$/)) {
        event.preventDefault()
        setInvalidInput(true)
        return
      }

      const check_data = {
        name: event.target.name,
        value: event.target.value
      }

      AxiosWrapper.post("/auth/check", { check_data })
      .then((resp) => {
        !resp.data.uniqueness ? setNameUnique(false) : setNameUnique(true)
      })
    }
    setInvalidInput(false)
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const handleCancel = () => navigate(`/${name}`)


  return (
    <EditProfileWrapper>
      <FormWrapper>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <TopField>
              <Label><label>名前</label></Label>
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
              <Label>
                <label>
                  ユーザーID <Caption>(3~10文字の半角英数字)</Caption>
                </label>
              </Label>
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
            {invalid_input && <Error>半角英数字またはアンダースコア(_)を使用してください</Error>}
            <OtherField>
              <Label><label>自己紹介</label></Label>
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