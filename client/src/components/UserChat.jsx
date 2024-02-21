import axios from 'axios';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import styled from "styled-components";

import UserProfileImg from "../assets/profile.svg";
import { useRecoilValue } from 'recoil';
import { userData } from '../recoil/Auth';

const UserChatBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 2px solid gray;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`

const UserChatInformationBox = styled.div`
  flex-grow: 1;
  position: relative;
  div {
    display: flex;
    justify-content: space-between;
    margin: 20px 10px;
    h1 {
      font-weight: bold;
    }
    h2 {
      color: #565557;
    }
    h3 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      background-color: #1CA88B;
      border-radius: 100%;
    }
  }
  /* 추가: 클릭 가능하도록 설정 */
  cursor: pointer;
`

const UserLogin = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  right: 0;
  top: -20px;
  border-radius: 100%;
  background-color: #1feac8;
`

const UserChat = ({ member, onClick,allUser,members }) => {
  const userId = useRecoilValue(userData)[0]?._id
  const username = members.filter(item => item !== userId)
  console.log(member)
  const findOtherUser = async () => {
    const response = await axios.get(`http://localhost:4040/api/users/find/${username}`);
    return response.data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['findOtherUser', member],
    queryFn: findOtherUser
  })

  const isUserInAllUsers = allUser.some(userObj => userObj.user === data?.name);

  console.log(isUserInAllUsers)
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Something is wrong..</p>

  return (
    <div>
      <UserChatBox onClick={onClick}>
        <img src={UserProfileImg} alt="#" />
        <UserChatInformationBox >
          <div>
            {isUserInAllUsers ? (<UserLogin></UserLogin>) : ""}
            <h1>{data?.name}</h1>
            <h2>12/12/2020</h2>
          </div>
          <div>
            <p>Text Message</p>
            <h3>3</h3>
          </div>
        </UserChatInformationBox>
      </UserChatBox>
    </div>
  )
}

UserChat.propTypes = {
  member: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  allUser: PropTypes.array.isRequired,
  members : PropTypes.array.isRequired
};

export default UserChat;
