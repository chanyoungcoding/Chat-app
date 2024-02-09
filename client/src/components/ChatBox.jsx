import PropTypes from 'prop-types';

const ChatBox = ({chatId}) => {
  console.log(chatId)
  return (
    <div>ChatBox</div>
  )
}

export default ChatBox

ChatBox.propTypes = {
  chatId: PropTypes.string.isRequired
};