import { useState } from "react";
import { handleNewQuestion } from '../actions/combined';
import { Navigate } from "react-router";
import { connect } from "react-redux";
import Navbar from "./Navbar";


const NewQuestion = (props) => {

    let [optionOne, setOptionOne] = useState('');
    let [optionTwo, setOptionTwo] = useState('');
    let [qID, setQID] = useState('');

    const  handleSubmit = () => {
        props.dispatch(handleNewQuestion(optionOne, optionTwo))
        .then((qid) => {
            setQID(qid);
        })
    }

    if (qID !== ''){
        console.log(qID);
        return <Navigate to='/' />
    }

    if (!props.authUser) {
        return <Navigate to='/login' />
    }
    return (
        <div>
            <Navbar />
            <br></br>
            <br></br>
            <h1>Would You Rather</h1>
            <div className='row'>
                <div className='col-sm-3 offset-sm-2'>
                    First Option
                </div>
                <div className='col-sm-5'>
                    <input className='form-control' type='text' placeholder='First Option' value={optionOne} onChange={(e) => setOptionOne(e.target.value)} />
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-3 offset-sm-2'>
                    Second Option
                </div>
                <div className='col-sm-5'>
                    <input className='form-control' type='text' placeholder='Second Option' value={optionTwo} onChange={(e) => setOptionTwo(e.target.value)} />
                </div>
            </div>
            <button className='btn btn-success' onClick={(e) => handleSubmit()}>Add Poll</button>
        </div>
    );
}

function mapStateToProps({ authUser, questions, users, }) {
    return {
      authUser,
    }
  }

export default connect(mapStateToProps)(NewQuestion);
