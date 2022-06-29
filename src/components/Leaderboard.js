import { connect } from "react-redux";
import { Navigate } from "react-router";
import Navbar from "./Navbar";


const Leaderboard = (props) => {
    let {authUser, users} = props;

    if (!authUser) {
        return <Navigate to='/login' />
    }
    let sortedUsers = Object.values(users).sort((userA,userB) => (Object.keys(userB.answers).length + userB.questions.length) - (Object.keys(userA.answers).length + userA.questions.length))
    console.log(sortedUsers)
    return (
        <div>
            <Navbar />
            <br></br>
            <br></br>
            <h1>Leaderboard</h1>
            <br></br>
            <table className='table'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Questions Asked</th>
                        <th>Questions Answered</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, key) => (
                        <tr className={authUser.id === user.id ? 'selected' : ''}>
                            <td style={{padding:'20px 0px'}}>{key+1}</td>
                            <td style={{padding:'20px 0px'}}><img src={user.avatarURL} style={{height:'40px', borderRadius:'50%', border:'2px solid black'}} alt='leader avatar'/>{user.name}</td>
                            <td style={{padding:'20px 0px'}}>{user.questions.length}</td>
                            <td style={{padding:'20px 0px'}}>{Object.keys(user.answers).length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function mapStateToProps({ authUser, users }) {
    return {
      authUser,
      users,
    }
  }
  
  export default connect(mapStateToProps)(Leaderboard)
  