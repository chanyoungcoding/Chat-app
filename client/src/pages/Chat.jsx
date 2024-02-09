import axios from "axios"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"
import { userData } from "../recoil/Auth"
import UserChat from "../components/UserChat"
import OtherUser from "../components/OtherUser"
import { useState } from "react"

const Chat = () => {

  const [chatBoxData, setChatBoxData] = useState([])

  const userId = useRecoilValue(userData)[0]?._id

  const findChat = async() => {
    const response = await axios.get(`http://localhost:4040/api/chats/${userId}`);
    return response.data;
  }

  const { data, error, isLodaing} = useQuery({
    queryKey: ['findChat'],
    queryFn: findChat
  })

  const handleOnClick = (chatId) => {
    const findChatBox = async() => {
      const response = await axios.get(`http://localhost:4040/api/messages/${chatId}`);
      return setChatBoxData(response.data);
    }
    findChatBox();
  }

  // const onHandleChange = (e) => {
  //   setMessage(e.target.value)
  //   console.log(message)
  // }

  console.log(chatBoxData)
  console.log(data)

  if(isLodaing) return <p>Loding...</p>

  if(error) return <p>Something is wrong..</p>

  return (
    <div>
      <OtherUser userId={userId}/>
      {data?.map((item,index) => (
        <div key={index}>
          <UserChat member={item.members[1]} onClick={() => handleOnClick(item._id)}/>
        </div>
      ))}
      {chatBoxData ? chatBoxData.map((item, index) => (
        <div key={index}>
          <p>{item.text}</p>
        </div>
      )) : ""}
    </div>
  )
}

export default Chat