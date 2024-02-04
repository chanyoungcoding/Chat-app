import { useRecoilState } from "recoil"
import { registerInformationState } from "../recoil/Auth"
import styled from "styled-components";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 80vh;
  margin: 0 auto;
`

const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputBox = styled.input`
  width: 80%;
  margin: 10px 0px;
  padding: 10px;
  font-size: 20px;
  outline: none;
  border: none;
`

const RegisterButton = styled.div`
  width: 80%;
  margin: 10px 0px;
  padding: 10px;
  font-size: 20px;
  text-align: center;
  background-color: #000000;
  outline: none;
  border: none;
`

const Register = () => {

  const [registerInfo, setRegisterInfo] = useRecoilState(registerInformationState);

  const handleOnChange = (e) => {
    setRegisterInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleOnSubmit = () => {
    console.log(registerInfo)
  }

  return (
    <RegisterContainer>
      <RegisterBox>
        <InputBox type="text" placeholder="이름" onChange={handleOnChange} name="name"/>
        <InputBox type="text" placeholder="아이디" onChange={handleOnChange} name="email"/>
        <InputBox type="text" placeholder="비밀번호" onChange={handleOnChange} name="password"/>
        <RegisterButton onClick={handleOnSubmit}>회원가입</RegisterButton>
      </RegisterBox>
    </RegisterContainer>
  )
}

export default Register