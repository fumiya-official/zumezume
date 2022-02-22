import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import AxiosWrapper from "../../../request/AxiosWrapper"
import { StateAuthContext,DispatchAuthContext } from "../../../context/AuthContext"
import Cookies from 'js-cookie'

const LoginWrapper = styled.div`
  text-align: center;
  margin-top: 4.5rem;
`

const FormWrapper = styled.div`
  margin: 0 auto;
  width: 20rem;
  height: 30rem;
  border: solid 5px rgba(155, 81, 77, 0.1);
  border-radius: 5px;
  padding: 1.5rem;
`

const Title = styled.div`
  font-size: 0.875rem;
  margin-bottom: 2.5rem;
`

const FormContainer = styled.div``

const Form = styled.form``

const TopField = styled.div`
  width: 100%;
  display: block;
  text-align: left;
  margin: 0;
`

const OtherField = styled.div`
  width: 100%;
  display: block;
  text-align: left;
  margin: 1rem 0 0 0;
`

const Label = styled.div`
  font-size: 0.95rem;
  padding-bottom: 0.2rem;
`

const Caption = styled.span`
  color: #c0c0c0;
  font-size: 0.8rem;
`

const InputWrapper = styled.div``

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  background-color: white;
  box-sizing: border-box;
  border: solid 1px #e8e8e8;
  border-radius: 5px;

  &:focus {
    border: solid 1px #96514d;
    outline: none;
  }

  &::placeholder{
    color: #dcdcdc;
  }
`

const Error = styled.p`
  color: red;
  text-align: left;
  font-size: 0.625rem;
  margin: 0.3rem 0 1rem 0;
  padding-left: 0.5rem;
`

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`

const SignupButton = styled.button`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #96514d;

  &:hover {
    background-color: #7a4340;
    cursor: pointer;
  }
`

const AnounceWrapper = styled.div`
  margin: 1.5rem 0;
`

const Anounce = styled.div`
  color: #b8b8b8;
  a {
    font-size: 0.777rem;
    color: #b8b8b8;
    text-decoration: underline;
  }
`

function Signup() {
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
      navigate("/");
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
          type: "SUCCESS",
          id: resp.data.data.name,
          name: resp.data.data.nickname
        })
        navigate("/")
      }
      else {
        console.log("失敗")
        dispatch({
          type: "FAILED",
          id: null,
          name: null
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: "FAILED",
        id: null,
        name: null
      })
    })
  }

  return (
    <>
      <LoginWrapper>
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
                <SignupButton>登録する</SignupButton>
              </ButtonWrapper>
              <AnounceWrapper>
                <Anounce>
                  <Link to="/login">登録済みの方はこちらから</Link>
                </Anounce>
              </AnounceWrapper>
            </Form>
          </FormContainer>
        </FormWrapper>
      </LoginWrapper>
    </>
  )
}

export default Signup