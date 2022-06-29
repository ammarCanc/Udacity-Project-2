import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const {authUser} = props;
    return (
        <nav>
            <ul style={{listStyle:"none"}}>
                <div className='row'>
                    <div  className='col-sm-4'>
                        <li key='home' style={{display:"inline", padding:"0px 20px 20px 0px"}}><Link to='/'>Home</Link></li>
                        <li key='leaderboard' style={{display:"inline", padding:"0px 20px 20px 0px"}}><Link to='/leaderboard'>Leaderboard</Link></li>
                        <li key='new_poll' style={{display:"inline", padding:"0px 20px 20px 0px"}}><Link to='/add'>New</Link></li>
                    </div>
                    <div className='offset-sm-4 col-sm-2'>
                        <div title={authUser.name}>
                            <img style={{height:'30px', borderRadius:'10%'}} src={authUser.avatarPath} alt={authUser.name}/>
                        </div>
                        
                    </div>
                    <div className='col-sm-2'>
                        <Link to='/logout'><button className='btn btn-danger'>Logout</button></Link>
                    </div>
                </div>
            </ul>
        </nav>
    );
}

function mapStateToProps({ authUser, questions, users, }) {
    return {
      authUser,
    }
  }
export default connect(mapStateToProps)(Navbar);