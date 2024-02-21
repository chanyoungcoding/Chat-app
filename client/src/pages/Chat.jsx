import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useRecoilValue } from "recoil"
import { useState } from "react"
import styled from "styled-components"
import InputEmoji from "react-input-emoji";
import socketIOClient from "socket.io-client";

import { FaLocationArrow } from "react-icons/fa6";

import { userData } from "../recoil/Auth"
import ChattingBox from "../components/ChattingBox"
import OtherUser from "../components/OtherUser"
import UserChat from "../components/UserChat"
import { useEffect } from "react"

const ChatContainer = styled.div`
  display: flex;
  margin: 30px;
`

const UserBox = styled.div`
  width: 30%;
  height: 750px;
  margin-right: 30px;
`

const ChatBox = styled.div`
  position: relative;
  width: 70%;
  padding: 30px;
  background-color: #1A1A1A;
  border-radius: 10px;
  .chat_input {
    width: 90%;
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 20px;
  }
  .submitButton {
    cursor: pointer;
  }
`


const Chat = () => {
  
  const userId = useRecoilValue(userData)[0]?._id
  const userName = useRecoilValue(userData)[0]?.name
  const socket = socketIOClient('localhost:4040');

  const [chatBoxData, setChatBoxData] = useState([])
  const [chatIdBox, setChatIdBox] = useState("");
  const [text, setText] = useState("");
  const [allUser, setAllUser] = useState([]);
  console.log(allUser)
  console.log(chatBoxData);

  const findChat = async() => {
    const response = await axios.get(`http://localhost:4040/api/chats/${userId}`);
    return response.data;
  }
  
  const { data, error, isLodaing} = useQuery({
    queryKey: ['findChat'],
    queryFn: findChat
  })
  
  const handleOnClick = (chatId) => {
    setChatIdBox(chatId)
    const findChatBox = async() => {
      const response = await axios.get(`http://localhost:4040/api/messages/${chatId}`);
      return setChatBoxData(response.data);
    }
    findChatBox();
  }
  
  const createMessageMutation = useMutation((newMessage) => 
    axios.post('http://localhost:4040/api/messages', newMessage),{
      mutationKey: 'createMessage',
      onSuccess: () => {
        // 새로운 메시지가 성공적으로 생성되면 해당 대화의 채팅 데이터를 다시 가져옴
        const findChatBox = async () => {
          const response = await axios.get(`http://localhost:4040/api/messages/${chatIdBox}`);
          setChatBoxData(response.data);
        };
        findChatBox();
      },
      onError: (error) => {console.error('Error creating todo:', error);},
      onSettled: () => {},
    }
  );

  const handleOnSubmit = () => {
    const data = {chatId: chatIdBox, senderId: userId, text: text}
    socket.emit('send message', data)
    createMessageMutation.mutate(data);
  }

  useEffect(() => {
    socket.on('receive message', (message) => {
      setChatBoxData(messageList => [...messageList, message]);
    })
  }, []);

  useEffect(() => {
    socket.emit('loginUser', {user: userName})
    socket.on('receive user', (username) => {
      setAllUser(username)
    })
  },[socket, userName])

  if(isLodaing) return <p>Loding...</p>

  if(error) return <p>Something is wrong..</p>

  return (
    <>
      <OtherUser userId={userId}/>
      <ChatContainer>
        <UserBox>

          {data?.map((item,index) => (
            <div key={index}>
              <UserChat allUser={allUser} members={item.members} member={item.members[1]} onClick={() => handleOnClick(item._id)}/>
            </div>
          ))}

        </UserBox>
        <ChatBox>
        {chatBoxData ? chatBoxData?.map((item, index) => (
          <div key={index}>
            <ChattingBox text={item.text} createdAt={item.createdAt} senderId={item.senderId}/>
          </div>
        )) : ""}
          <div className="chat_input">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              placeholder="Type a message"
            />
            <FaLocationArrow  className="submitButton" size={25} color="#324D8C" onClick={handleOnSubmit}/>
          </div>
        </ChatBox>
      </ChatContainer>
    </>
  )
}

export default Chat