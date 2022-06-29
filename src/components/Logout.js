import React, { Component } from 'react'
import { logoutUser } from '../actions/authUser'
import { connect } from 'react-redux'
import {Navigate} from 'react-router-dom';
class Logout extends Component {

  logout = () => {
    this.props.dispatch(logoutUser())
  }
  render() {
    if (!this.props.authUser) {
        return <Navigate to='/login' />
    }
    return(
      <div>
        <br></br>
        <br></br>
        {console.log('sdssdaddadada')}
        <h3>{this.props.authUser.name}, are you really want to logout?</h3>
        <br></br>
        <div className='row'><button className="btn btn-outline-success btn-lg mx-auto" type="button" onClick={this.logout}>Logout</button></div>
      </div>
    )
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  }
}

export default connect(mapStateToProps)(Logout)
