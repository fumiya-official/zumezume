import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosWrapper from "../../../request/AxiosWrapper"
import { StateAuthContext,DispatchAuthContext } from "../../../context/AuthContext"
import Cookies from 'js-cookie'
import {
  AuthWrapper,
  FormWrapper,
  Title,
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
  AnnounceWrapper,
  Announce
} from '../../../styles/Auth/AuthStyle'


function SignupForm() {
  const navigate = useNavigate()
  const [id_unique, setIdUnique] = useState(true) // falseなら同じIDが登録されている
  const [email_unique, setEmailUnique] = useState(true) // falseなら同じemialが登録されている
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  const { state } = useContext(StateAuthContext)
  const { dispatch } = useContext(DispatchAuthContext)

  useEffect(() => {
    // ログインしていればホームへ遷移
    if (state.auth) {
      navigate("/works");
    }
  })
  
  // nameまたはemailがユニークかどうか
  const handleChange = (event) => {
    if (event.target.name === "name" || event.target.name === "email") {
      const check_data = {
        name: event.target.name,
        value: event.target.value
      }
      AxiosWrapper
      .post("/auth/check", { check_data })
      .then((resp) => {
        if (!resp.data.uniqueness) { // 一致するデータがあるとき
          event.target.name === "name"
          ? setIdUnique(false)
          : setEmailUnique(false)
          return
        } else {
          event.target.name === "name"
          ? setIdUnique(true)
          : setEmailUnique(true)
        }
      })
      .catch((err) => {
        
      })
    }

    setUser({ ...user, [event.target.name]: event.target.value})
  }

  const handleSignup = (event) => {
    event.preventDefault()

    let params = {
      name: user.name,
      email: user.email,
      password: user.password
    }

    AxiosWrapper
    .post("/auth", params, { withCredentials: true })
    .then((resp) => {
      if (resp.status === 200) {
        // Cookieに各値を格納
        // 後でメール確認も追加
        console.log("成功")
        Cookies.set("_access_token", resp.headers["access-token"])
        Cookies.set("_client", resp.headers["client"])
        Cookies.set("_uid", resp.headers["uid"])
        dispatch({
          type: 200,
          id: resp.data.data.name,
          name: resp.data.data.nickname
        })
        navigate("/")
      }
      else {
        console.log("失敗")
        dispatch({
          type: 400
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: 400
      })
    })
  }

  return (
    <>
      <AuthWrapper>
        <FormWrapper>
          <Title>
            <h1>ズメズメを始める</h1>
          </Title>
          <FormContainer>
            <Form onSubmit={handleSignup} id="form">
              <TopField>
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
              </TopField>
              {!id_unique && <Error>既に使われています</Error>}
              <OtherField>
                <Label>
                  <label>メールアドレス</label>
                </Label>
                <InputWrapper>
                  <Input
                    onChange={handleChange}
                    type="email"
                    value={user.email}
                    placeholder="zumezume@exapmle.com"
                    name="email"
                    autoComplete="on"
                    required
                  />
                </InputWrapper>
              </OtherField>
              {!email_unique && <Error>既に使われています</Error>}
              <OtherField>
                <Label>
                  <label>
                    パスワード <Caption>(6文字以上)</Caption>
                  </label>
                </Label>
                <InputWrapper>
                  <Input
                    onChange={handleChange}
                    type="password"
                    value={user.password}
                    name="password"
                    autoComplete="on"
                    minLength="6"
                    required
                  />
                </InputWrapper>
              </OtherField>
              <ButtonWrapper>
                <Button>登録する</Button>
              </ButtonWrapper>
              <AnnounceWrapper>
                <Announce>
                  <Link to="/login">登録済みの方はこちらから</Link>
                </Announce>
              </AnnounceWrapper>
            </Form>
          </FormContainer>
        </FormWrapper>
      </AuthWrapper>
    </>
  )
}

export default SignupForm