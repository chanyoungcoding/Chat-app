import axios from 'axios';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import styled from "styled-components";

import UserProfileImg from "../assets/profile.svg";

const UserChatContainer = styled.div`
  display: flex;
`

const UserChatBox = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  border-bottom: 2px solid gray;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`

const UserChattingBox = styled.div`
  width: 70%;
  background-color: gray;
`

const UserChatInformationBox = styled.div`
  flex-grow: 1;
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

const UserChat = ({ member, onClick }) => {
  const findOtherUser = async () => {
    const response = await axios.get(`http://localhost:4040/api/users/find/${member}`);
    return response.data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['findOtherUser', member],
    queryFn: findOtherUser
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Something is wrong..</p>

  return (
    <UserChatContainer>
      <UserChatBox onClick={onClick}>
        <img src={UserProfileImg} alt="#" />
        <UserChatInformationBox >
          <div>
            <h1>{data?.name}</h1>
            <h2>12/12/2020</h2>
          </div>
          <div>
            <p>Text Message</p>
            <h3>3</h3>
          </div>
        </UserChatInformationBox>
      </UserChatBox>

      <UserChattingBox>

      </UserChattingBox>
    </UserChatContainer>
  )
}

UserChat.propTypes = {
  member: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default UserChat;
