import { useMutation } from 'react-query';
import axios from 'axios';
import styled from "styled-components";
import { userInformationState } from '../recoil/Auth';
import { useRecoilState } from 'recoil';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 80vh;
  margin: 0 auto;
`

const LoginBox = styled.div`
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

const LoginButton = styled.div`
  width: 80%;
  margin: 10px 0px;
  padding: 10px;
  font-size: 20px;
  text-align: center;
  background-color: #000000;
  outline: none;
  border: none;
`

const Login = () => {
  
  const [user, setUser] = useRecoilState(userInformationState);

  const loginMutation = useMutation((user) => 
    axios.post('http://localhost:4040/api/users/login', user),{
        mutationKey: 'login',
        onSuccess: (e) => {
          localStorage.setItem("user", JSON.stringify(e.data));
          window.location.href = '/';
        },
        onError: (error) => {console.error('Error creating todo:', error);},
        onSettled: () => {},
      }
  );

  const handleOnSubmit = () => {
    loginMutation.mutate(user);
  }

  const handleOnChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <LoginContainer>
      <LoginBox>
        <InputBox type="text" onChange={handleOnChange} placeholder="아이디" name="email"/>
        <InputBox type="text" onChange={handleOnChange} placeholder="비밀번호" name="password"/>
        <LoginButton onClick={handleOnSubmit} >로그인</LoginButton>
      </LoginBox>
    </LoginContainer>
  )
}

export default Login