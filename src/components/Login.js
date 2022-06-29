import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loginUser } from '../actions/authUser'
import _ from 'lodash'
import { Navigate } from 'react-router-dom'


class Login  extends  Component{

    state = {
        'selectedUser': '',
        'redirect': false
    }

    handleClick = (userID)  => {
        this.setState((p) =>({
            selectedUser:  userID
        }))
    }

    login = (e) => {
        e.preventDefault()
        let id = this.state.selectedUser
        let userObject = _.pickBy(this.props.users, (user) => user.id === id) // like filter for objects
        let name = userObject[id].name
        let picture = userObject[id].avatarURL
        this.props.dispatch(loginUser(id, name, picture))
        this.setState((prevState) => ({
          ...prevState,
          redirect: true
        }))
    }
    
    render(){
        let { users, loading } = this.props;
        if (this.state.redirect === true) {
            return <Navigate to='/' />
        }
        return (
            <div>
                <h3>Please Login</h3>
                {
                    loading===true?null:
                    (
                        <Fragment>
                            <div style={{display:'flex'}}>
                                {Object.values(users).map((user) => (
                                    <div key={user.id} className={(user.id === this.state.selectedUser ? 'border-green':'')}
                                    onClick={() => this.handleClick(user.id)} style={{curser:'pointer', marginLeft: 'auto', marginRight: 'auto'}}>
                                        <img style={{height:'50px'}} src={user.avatarURL} alt='User Avatar' />
                                        <div>
                                            <p>{user.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br></br>
                            <br></br>
                            <div className='row'>
                                <button className="btn btn-lg btn-outline-success" type="button" onClick={this.login} disabled={!this.state.selectedUser.length > 0}>Login</button>
                            </div>
                        </Fragment>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
      users,
      loading: users === null,
    }
  }

export default connect(mapStateToProps)(Login);
