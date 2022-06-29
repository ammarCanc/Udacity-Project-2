import { useState } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import _ from "lodash";
import Navbar from "./Navbar";


const Home = (props) => {
    const [tab, setTab]  = useState('home');

    let { questions, authUser, users } = props;
    
    if (!authUser) {
        return <Navigate to='/login' />
    }
    
    let userObj = _.pickBy(users, (user) => user.id === authUser.id)
    let user = userObj[authUser.id]
    let answersKeys = Object.keys(user.answers)
    let questionsKeys = Object.keys(questions)
    let unansweredKeys = _.difference(questionsKeys, answersKeys)
    let unanswered = _.pick(questions, unansweredKeys)
    let answered = _.pick(questions, answersKeys)
    let sortedUnanswered = Object.values(unanswered).sort((a,b,) => b.timestamp - a.timestamp)
    let sortedAnswered = Object.values(answered).sort((a,b,) => b.timestamp - a.timestamp)

    
    return (
        <div>
            <h1>Home</h1>
            <Navbar />
            <div>
                <h3>New Questions</h3>
                <div className='card-group'>
                {sortedUnanswered.map((question) => (
                    <div className='card' style={{width:'13rem', margin:'0px 10px 0px 10px', border:'3px solid lightgreen'}}>
                        <div className='card-body'>
                            <h4>{question.author}</h4>
                            <Link to={`/questions/${question.id}`} state={{ id: question.id}}><button className='btn btn-outline-success mx-auto'>Show</button></Link>
                        </div>
                    </div>
                ))}
                </div>
            </div>

            <div>
                <h3>Done</h3>
                <div className='card-group'>
                {sortedAnswered.map((question) => (
                    <div className='card' style={{width:'13rem', margin:'0px 10px 0px 10px', border:'3px solid lightgreen'}}>
                        <div className='card-body'>
                            <h4>{question.author}</h4>
                            <Link to={`/questions/${question.id}`} state={{ id: question.id}}><button className='btn btn-outline-success mx-auto'>Show</button></Link>
                        </div>
                    </div>
                ))}
                </div>
            </div>

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

export default connect(mapStateToProps)(Home);
