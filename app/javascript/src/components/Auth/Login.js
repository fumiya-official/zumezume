import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import AxiosWrapper from "../../request/AxiosWrapper"
import { StateAuthContext,DispatchAuthContext } from '../AuthContext'
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

const FormContainer = styled.div`
  
`

const Form = styled.form`

`

const MailField = styled.div`
  width: 100%;
  display: block;
  text-align: left;
  margin: 0;
`

const PasswordField = styled.div`
  width: 100%;
  display: block;
  text-align: left;
  margin: 1rem 0 0 0;
`

const Label = styled.div`
  font-size: 1rem;
  padding-bottom: 0.2rem;
`

const InputWrapper = styled.div`
`

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
`

const Error = styled.p`
  color: red;
  font-size: 0.625rem;
  margin: 2rem 0 0 0;
`

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`

const LoginButton = styled.button`
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

function Login() {
  const navigate = useNavigate()
  const [match, setMatch] = useState(true)
  const [user, setUser] = useState({
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

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
  }

  const handleLogin = (event) => {
    event.preventDefault()

    let params = {
      email: user.email,
      password: user.password
    }

    AxiosWrapper
    .post("/auth/sign_in", params, { withCredentials: true})
    .then((resp) => {
      if (resp.status === 200) {
        // Cookieに各値を格納
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
        setMatch(false)
        dispatch({
          type: "FAILED",
          id: null,
          name: null
        })
      }
    })
    .catch((err) => {
      setMatch(false)
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
            <h1>ログイン</h1>
          </Title>
          <FormContainer>
            <Form onSubmit={handleLogin} id="form">
              <MailField>
                <Label>
                  <label>メールアドレス</label>
                </Label>
                <InputWrapper>
                  <Input
                    onChange={handleChange}
                    type="email"
                    value={user.email}
                    placeholder="zumezume@example.com"
                    name="email"
                    required
                  />
                </InputWrapper>
              </MailField>
              <PasswordField>
                <Label>
                  <label>パスワード</label>
                </Label>
                <InputWrapper>
                  <Input
                    onChange={handleChange}
                    type="password"
                    value={user.password}
                    name="password"
                    autoComplete="on"
                    required
                  />
                </InputWrapper>
              </PasswordField>
              {!match && (
                <Error>
                  メールアドレス、またはパスワードに誤りがあります。
                </Error>
              )}
              <ButtonWrapper>
                <LoginButton>ログイン</LoginButton>
              </ButtonWrapper>
              <AnounceWrapper>
                <Anounce>
                  <Link to="/signup">新規会員登録はこちらから</Link>
                </Anounce>
                <Anounce>
                  <Link to="/forgot_password">パスワードのお忘れはこちらから</Link>
                </Anounce>
              </AnounceWrapper>
            </Form>
          </FormContainer>
        </FormWrapper>
      </LoginWrapper>
    </>
  );
}

export default Login