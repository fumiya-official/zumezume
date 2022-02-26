import React, { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import AxiosWrapper from "../../../request/AxiosWrapper"
import { StateAuthContext,DispatchAuthContext } from '../../../context/AuthContext'
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
  InputWrapper,
  Input,
  Error,
  ButtonWrapper,
  Button,
  AnnounceWrapper,
  Announce
} from "../../../styles/Auth/AuthStyle"


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
          type: 200,
          id: resp.data.data.name,
          name: resp.data.data.nickname
        })
        navigate("/")
      }
      else {
        setMatch(false)
        dispatch({
          type: 400,
          id: null,
          name: null
        })
      }
    })
    .catch((err) => {
      setMatch(false)
      dispatch({
        type: 400,
        id: null,
        name: null
      })
    })
  }

  return (
    <>
      <AuthWrapper>
        <FormWrapper>
          <Title>
            <h1>ログイン</h1>
          </Title>
          <FormContainer>
            <Form onSubmit={handleLogin} id="form">
              <TopField>
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
              </TopField>
              <OtherField>
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
              </OtherField>
              {!match && (
                <Error>
                  メールアドレス、またはパスワードに誤りがあります。
                </Error>
              )}
              <ButtonWrapper>
                <Button>ログイン</Button>
              </ButtonWrapper>
              <AnnounceWrapper>
                <Announce>
                  <Link to="/signup">新規会員登録はこちらから</Link>
                </Announce>
                <Announce>
                  <Link to="/forgot_password">パスワードのお忘れはこちらから</Link>
                </Announce>
              </AnnounceWrapper>
            </Form>
          </FormContainer>
        </FormWrapper>
      </AuthWrapper>
    </>
  );
}

export default Login