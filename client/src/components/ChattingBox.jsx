import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userData } from '../recoil/Auth';

import moment from "moment";

const ChattingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.color ? "start" : "end"};
  h1 {
    display: inline-block;
    margin: 30px 0px 10px;
    padding: 15px 30px;
    color: white;
    background-color: ${(props) => props.color ? "#02C5A6" : "#2D2D2D" };
    border-radius: 5px;
  }
  p {
    position: relative;
    color: #91908F;
  }
  
`

const ChattingBox = ({ text, createdAt, senderId }) => {

  const userId = useRecoilValue(userData)[0]?._id;
  const boxColor = userId === senderId ? userId : null;
  
  return (
    <ChattingContainer color={boxColor}>
      <div>
        <h1>{text}</h1>
      </div>
      <p>{moment(createdAt).calendar()}</p>
    </ChattingContainer>
  )
}

export default ChattingBox

ChattingBox.propTypes = {
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
};