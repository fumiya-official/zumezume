import React, { useState, useContext, useEffect } from "react";
import LogoDiv from "./Division/LogoDiv";
import SettingDiv from "./Division/SettingDiv";
import ModalWindowDiv from "./Division/ModalWindowDiv";
import AxiosWrapper from "../../../request/AxiosWrapper";
import { StateAuthContext } from "../../../context/AuthContext";
import { WorkDataContext, WorkInputContext } from "../../../context/WorkContext";
import {
  NavBarWrapper,
  Header,
  Left,
  Center,
  Right,
  ButtonWrapper,
  Button,
  FillButtonWrapper,
  FillButton
} from "../../../styles/NavBar/NavBarStyle";


const PostNavBar = (props) => {
  /**
   * @type {[boolean, Function]} - show_save_modal; true: 保存完了のモーダルウィンドウを表示
   * @type {[boolean, Function]} - show_post_modal; true: 投稿完了のモーダルウィンドウを表示
   * @type {[boolean, Function]} - show_error_modal; true: 投稿ができない旨のモーダルウィンドウを表示
   * @type {[number, Function]} - work_id; 編集するworkのid
   * @param {Object} state - ユーザ情報
   *  @property {number} id - ユーザid
   * @param {Object} data - workデータ関連
   *  @property {Object} work - work
   *    @property {string} title - タイトル
   *    @property {string} content - 本文
   * @param {Object} input - workの入力関連
   *  @property {boolean} invalid_title - true: タイトルが原因でリクエストできない
   *  @property {boolean} invalid_content - true: 本文が原因でリクエストできない
   */
  const [show_save_modal, setShowSaveModal] = useState(false)
  const [show_post_modal, setShowPostModal] = useState(false)
  const [show_error_modal, setShowErrorModal] = useState(false)
  const [work_id, setWorkId] = useState(null)
  const { state } = useContext(StateAuthContext)
  const data = useContext(WorkDataContext)
  const input = useContext(WorkInputContext)

  const handleSave = () => {
    const post_data = {
      title: data.work.title,
      content: data.work.content,
      release: 0,
      user_id: state.id,
    }

    if (props.action === "post") {
      AxiosWrapper.post("/work/works", { work: post_data }, { withCredentials: true })
        .then((resp) => {
          setShowSaveModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else if (props.action === "edit") {
      AxiosWrapper.patch(`/work/works/${data.work.id}`, { work: post_data }, { withCredentials: true })
        .then((resp) => {
          setShowSaveModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handlePost = () => {
    if (input.invalid_title || input.invalid_content) {
      setShowErrorModal(true)
      return
    }
    
    const post_data = {
      title: data.work.title,
      content: data.work.content,
      release: 1,
      user_id: state.id,
    }
    
    if (props.action === "post") {
      AxiosWrapper.post("/work/works", { work: post_data }, { withCredentials: true })
        .then((resp) => {
          setWorkId(resp.data.id)
          setShowPostModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else if (props.action === "edit") {
      AxiosWrapper.patch(`/work/works/${data.work.id}`, { work: post_data }, { withCredentials: true })
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
            <ButtonWrapper>
              <Button onClick={handleSave}>キャンセル</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button onClick={handleSave}>保存</Button>
            </ButtonWrapper>
            <FillButtonWrapper>
              <FillButton onClick={handlePost} >
                投稿
              </FillButton>
            </FillButtonWrapper>
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
