import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import LogoDiv from "./Division/LogoDiv";
import SettingDiv from "./Division/SettingDiv";
import ModalWindowDiv from "./Division/ModalWindowDiv";
import AxiosWrapper from "../../request/AxiosWrapper";
import { StateAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBarWrapper = styled.div`
  height: 2.5rem;
  border-bottom: solid 0.1px #c0c0c0;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const Left = styled.div`
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
`;

const Right = styled.div`
  div {
    display: inline-block;
  }
  padding-right: 2rem;
  color: #fff;
  text-align: center;
  font-size: 0.93rem;
`;

const CancelWrapper = styled.div`
  margin: 0 0.5em;
`;

const CancelButton = styled.button`
  display: inline-block;
  padding: 0.1em 1em;
  text-decoration: none;
  background: #f7f7f7;
  color: #96514d;
  border: solid 1px #96514d;
  border-radius: 3px;

  a {
    color: inherit;
  }

  &:hover {
    color: #ba6661;
    border: solid 1px #ba6661;
    cursor: pointer
  }
`;

const SaveWrapper = styled.div`
  margin: 0 0.5em;
`;

const SaveButton = styled.button`
  display: inline-block;
  padding: 0.1em 1em;
  text-decoration: none;
  background: #f7f7f7;
  color: #96514d;
  border: solid 1px #96514d;
  border-radius: 3px;

  a {
    color: inherit;
  }

  &:hover {
    color: #ba6661;
    border: solid 1px #ba6661;
    cursor: pointer;
  }
`;

const PostWrapper = styled.div`
  margin: 0 0.5em;
`;

const PostButton = styled.button`
  display: inline-block;
  padding: 0.1em 1em;
  text-decoration: none;
  background: #96514d;
  border: solid 1px #96514d;
  border-radius: 3px;
  color: inherit;

  &:hover {
    background-color: #7a4340;
    border: solid 1px #7a4340;
    cursor: pointer;
  }
`;


const PostNavBar = (props) => {
  const [show_save_modal, setShowSaveModal] = useState(false)
  const [show_post_modal, setShowPostModal] = useState(false)
  const [show_error_modal, setShowErrorModal] = useState(false)
  const [work_id, setWorkId] = useState(null)
  const { state } = useContext(StateAuthContext)
  const navigate = useNavigate()
  console.log(props)
  // 現在のユーザとworks.user_idが一致しなければWorkListに遷移
  useEffect(() => {
    if (props.value.user_id) {
      if (props.action === "edit" && props.value.user_id !== state.id) {
        navigate("/works")
      }
    }
  }, [props.value.user_id])

  const handleSave = () => {
    const work = {
      title: props.value.title,
      content: props.value.content,
      release: 0,
      user_id: state.id,
    }

    if (props.action === "post") {
      AxiosWrapper.post("/work/works", { work: work }, { withCredentials: true })
        .then((resp) => {
          setShowSaveModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else if (props.action === "edit") {
      AxiosWrapper.patch(`/work/works/${props.value.id}`, { work: work }, { withCredentials: true })
        .then((resp) => {
          setShowSaveModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handlePost = () => {
    if (props.invalid_title || props.invalid_content) {
      setShowErrorModal(true)
      return
    }

    const work = {
      title: props.value.title,
      content: props.value.content,
      release: 1,
      user_id: state.id,
    }
    
    if (props.action === "post") {
      AxiosWrapper.post("/work/works", { work: work }, { withCredentials: true })
        .then((resp) => {
          setWorkId(resp.data.id)
          setShowPostModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else if (props.action === "edit") {
      AxiosWrapper.patch(`/work/works/${props.value.id}`, { work: work }, { withCredentials: true })
        .then((resp) => {
          setWorkId(resp.data.id)
          setShowPostModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <NavBarWrapper>
        <Header>
          <Left>
            <LogoDiv />
          </Left>
          <Right>
            <CancelWrapper>
              <CancelButton onClick={handleSave}>キャンセル</CancelButton>
            </CancelWrapper>
            <SaveWrapper>
              <SaveButton onClick={handleSave}>保存</SaveButton>
            </SaveWrapper>
            <PostWrapper>
              <PostButton onClick={handlePost} >
                投稿
              </PostButton>
            </PostWrapper>
            <SettingDiv />
          </Right>
        </Header>
        { show_save_modal && (
          <ModalWindowDiv text={"作品を保存しました"} path={"/works"} />
        )}
        { show_post_modal && (
          <ModalWindowDiv text={"作品を投稿しました"} path={`/works/${work_id}`} />
        )}
        { show_error_modal && (
          <ModalWindowDiv text={"制限文字数を越えています"} setShowErrorModal={setShowErrorModal}/>
        )}
      </NavBarWrapper>
    </>
  );
};

export default PostNavBar;
