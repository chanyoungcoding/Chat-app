import axios from "axios";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import Swal from "sweetalert2";

import PropTypes from 'prop-types';

const OtherUserContainer = styled.div`
  display: flex;
  margin: 50px 30px 0px;
  h1 {
    margin: 0px 10px;
    padding: 10px 20px;
    background-color: #1A1A1A;
    border-radius: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    cursor: pointer;
  }
`

const handleOnErrorMessage = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "채팅이 존재합니다.",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
}

const handleOnCreateMessage = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "채팅이 만들어졌습니다.",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
}

const OtherUser = ({userId}) => {
  const OtherUser = async() => {
    const response = await axios.get(`http://localhost:4040/api/users`);
    return response.data;
  }

  const { data, error, isLodaing} = useQuery({
    queryKey: ['OtherUser'],
    queryFn: OtherUser
  })

  const createChatMutation = useMutation((newChat) => 
    axios.post(`http://localhost:4040/api/chats`, newChat),{
      mutationKey: 'createChat',
      onSuccess: (e) => {
        e.data.message === "채팅존재" ? 
        handleOnErrorMessage() : 
        handleOnCreateMessage()
      },
      onError: (error) => {
        console.error('Error creating Chat:', error);
      },
      onSettled: () => {},
    }
  );

  const onClickChat = (otherId) => {
    const newChat = {firstId: userId, secondId: otherId};
    createChatMutation.mutate(newChat);
  }


  if(isLodaing) return <p>Loding...</p>
  if(error) return <p>Something is wrong..</p>

  return (
    <OtherUserContainer>
      {data?.map((item,index) => (
        <div key={index}>
          <h1 onClick={() => (onClickChat(item._id))}>{item.name}</h1>
        </div>
      ))}
    </OtherUserContainer>
  )
}

export default OtherUser

OtherUser.propTypes = {
  userId: PropTypes.string.isRequired,
};