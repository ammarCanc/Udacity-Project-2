import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import {Component, Fragment, useEffect} from 'react';
import { connect } from 'react-redux'
import Logout from './components/Logout';
import { handleInitialData } from './actions/combined'
import Question from './components/Question';
import NewQuestion from './components/NewQuestion';
import Leaderboard from './components/Leaderboard';


const ProtectedPath = ({ component: Component, isLoggedIn, ...rest }) => (
  isLoggedIn ? <Component {...rest}/> : <Navigate to='/login' />
)

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    let { loading, loggedIn, questions, qid } = this.props;
    return (
      <div className="App">
          <Routes>
            <Route exact path='/login' element={<Login />}/>
            <Route exact path='/' element={<ProtectedPath component={Home} isLoggedIn={loggedIn} />} />
            <Route exact path='/logout' element={<ProtectedPath component={Logout} isLoggedIn={loggedIn} />} />
            <Route exact path='/add' element={<ProtectedPath  component={NewQuestion} isLoggedIn={loggedIn} />} />
            <Route exact path='leaderboard' element={<ProtectedPath component={Leaderboard} isLoggedIn={loggedIn} />} />
            {
                <Route path='/questions/:id' element={<ProtectedPath component={Question} isLoggedIn={loggedIn} />} />
            }
          </Routes>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser, }, { location }) {
  return {
    loading: (Object.keys(users).length === 0 && users.constructor === Object) || (Object.keys(questions).length === 0 && questions.constructor === Object), // check whether data is already loaded
    loggedIn: authedUser !== null,
    questions,
  }
}

export default connect(mapStateToProps)(App);
