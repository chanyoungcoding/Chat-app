import axios from "axios"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"
import { userData } from "../recoil/Auth"

const Chat = () => {

  const userId = useRecoilValue(userData)[0]?._id

  const findChat = async() => {
    const response = await axios.get(`http://localhost:4040/api/chats/${userId}`);
    return response.data;
  }

  const { data, error, isLodaing} = useQuery({
    queryKey: ['findChat'],
    queryFn: findChat
  })

  console.log(data)

  if(isLodaing) return <p>Loding...</p>

  if(error) return <p>Something is wrong..</p>

  return (
    <div>Chat</div>
  )
}

export default Chat