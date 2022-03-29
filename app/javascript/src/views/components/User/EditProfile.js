import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUniqueness } from "../../../request/api/auth"
import { getUsers, editUser } from "../../../request/api/user"
import { StateAuthContext } from "../../../context/AuthContext";
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
import {
  EditProfileWrapper,
  FormWrapper,
  Textarea,
  CancelButton
} from "../../../styles/User/UserStyle"

function EditProfile() {
  const navigate = useNavigate()
  const [name_unique, setNameUnique] = useState(true)
  const [invalid_input, setInvalidInput] = useState(false) // true: 無効な文字 false: 有効な文字
  const [user, setUser] = useState({
    nickname: "",
    name: "",
    biography: ""
  })
  const { state } = useContext(StateAuthContext);
  const name = state.name ? state.name : navigate(-1)
  
  const handleGetUsers = async () => {
    try {
      const resp = await getUsers(name)
      if (resp.status == 200) {
        setUser({
          id: resp.data.id,
          nickname: resp.data.nickname,
          name: resp.data.name,
          biography: resp.data.biography
        });
      }
    }
    catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
    handleGetUsers()
  }, [name])

  useEffect(() => {
    if (!state.auth) navigate("/works")
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const resp = await editUser(user.id, user.nickname, user.name, user.biography)
      if (resp.status == 200) {
        navigate(`/${name}`)
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  const handleChange = async (event) => {
    if (event.target.name === "name") {
      if (!event.target.value.match(/^[0-9a-zA-Z\\_]*$/)) {
        event.preventDefault()
        setInvalidInput(true)
        return
      } else {
        setInvalidInput(false)
        setUser({...user, [event.target.name]: event.target.value})
        
        try {
          const resp = await checkUniqueness(event.target.name, event.target.value)
          !resp.data.uniqueness ? setNameUnique(false) : setNameUnique(true);
        }
        catch(err) {

        }
      }
    }
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