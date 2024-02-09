import axios from "axios";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";

import PropTypes from 'prop-types';

const OtherUserContainer = styled.div`
  
`

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
      onSuccess: () => {console.log('Chat created successfully');},
      onError: (error) => {console.error('Error creating Chat:', error);},
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
  userId: PropTypes.string.isRequired
};