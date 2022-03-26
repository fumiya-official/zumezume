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
  const [invalid_input, setInvalidInput] = useState(false) // true: 無効な文字 false: 有効な文字
  const [name_error_message, setNameErrorMessage] = useState(null)
  const [post_error_message, setPostErrorMessage] = useState(null)
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
    if (event.target.name == "name" && !event.target.value.match(/^[0-9a-zA-Z\\_]*$/)) {
      event.preventDefault()
      setInvalidInput(true)
      setNameErrorMessage("半角英数字またはアンダースコア(_)を使用してください")
      return
    }

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
          ? (setIdUnique(false), setNameErrorMessage("既に使われているIDです"))
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
    setNameErrorMessage(null)
    setInvalidInput(false)
    setUser({ ...user, [event.target.name]: event.target.value})
  }

  const handleSignup = (event) => {
    event.preventDefault()

    if (!id_unique || !email_unique ) {
      setPostErrorMessage("無効な入力があります")
      return
    }

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
              {(!id_unique || invalid_input) && <Error>{name_error_message}</Error>}
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
                    minLength="6"
                    autoComplete='on'
                    required
                  />
                </InputWrapper>
              </OtherField>
              <ButtonWrapper>
                <Button>登録する</Button>
              </ButtonWrapper>
              {post_error_message && <Error>{post_error_message}</Error>}
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