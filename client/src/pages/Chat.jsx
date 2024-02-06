import axios from "axios"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"
import { userData } from "../recoil/Auth"
import UserChat from "../components/UserChat"

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

  if(isLodaing) return <p>Loding...</p>

  if(error) return <p>Something is wrong..</p>

  return (
    <div>
      {data?.map((item,index) => (
        <div key={index}>
          <UserChat member={item.members}/>
        </div>
      ))}
    </div>
  )
}

export default Chat