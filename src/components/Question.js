import { Link, useLocation} from "react-router-dom";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { handleVoteAnswer } from "../actions/combined";
import _ from "lodash";
import { useState } from "react";
import Navbar from "./Navbar";


const Question = (props) => {

    let location = useLocation()
    let [option, setOption] = useState(null);
    let [updateData, setUpdateData] = useState(null);
    let { questions, authUser, users } = props;

    if (!authUser) {
        return <Navigate to='/login' />
    }
    const questionID = location.state.id;
    let question = Object.values(questions).filter((q) => q.id === questionID)[0]
    let userData  = Object.values(users).filter((u) => u.id === authUser.id)[0]
    console.log('sdddsdsd[][]')
    console.log(question)
    let alreadyAnswered = Object.keys(userData.answers).includes(questionID)
    let optionAlreadySelected = null;
    if  (alreadyAnswered){
        optionAlreadySelected = question.optionOne.votes.includes(authUser.id)?'optionOne':'optionTwo';
        setOption(optionAlreadySelected);
    }
    
    const optionChoosen = (opt) => {
        if(!alreadyAnswered){
            setOption(opt);
        }
    }
    const handleVote = () => {
        props.dispatch(handleVoteAnswer(questionID, option))
    }
    return (
        <div>
            <Navbar />

            <h4 style={{color:'blue'}}>A poll by {question.author}</h4>
            <img src={Object.values(users).filter((u) =>question.author === u.id)[0].avatarURL} alt='creator image' style={{borderRadius:'50%', border:'5px solid black'}}/>
            <h1>Would you rather</h1>
            <br></br>
            <br></br>
            <div  className='row'>
                <div className={`col-sm-6 ${option === 'optionOne' ? 'selected' : ''}`} style={{backgroundColor:'#eeccff', border:'2px solid grey', padding:'30px 20px',}} onClick={(e) => optionChoosen('optionOne')}>
                    {question.optionOne.text}
                    {alreadyAnswered  && (
                        <p>Total Votes: {question.optionOne.votes.length}</p>
                    )}
                </div>
                <div className={`col-sm-6 ${option === 'optionTwo' ? 'selected' : ''}`}  style={{backgroundColor:'lightblue', border:'2px solid grey', padding:'30px 20px'}} onClick={(e) => optionChoosen('optionTwo')}>
                    {question.optionTwo.text}
                    {alreadyAnswered  && (
                        <p>Total Votes: {question.optionTwo.votes.length}</p>
                    )}
                </div>
            </div>
            <br></br>
            <br></br>
            <button className='btn btn-success' disabled={!option || alreadyAnswered} onClick={(e) => handleVote()}>Vote</button>

        </div>
    );
}
function mapStateToProps({ authUser, questions, users, }) {
    return {
      authUser,
      questions,
      users,
    }
  }

export default connect(mapStateToProps)(Question);
