import React, { Component } from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'


// export const ToggleButton = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user }) =>
//     <li>
//       {user ? <WhoAmI/> : <Link to="/login"> LOGIN OR SIGN UP </Link>}
//     </li>
// )
// const AdminButton = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user }) =>
//     <li>
//       {user && user.isAdmin ? <Link to="/admin">ADMIN</Link> : null}
//     </li>
// )


export default class Welcome extends Component{
	constructor(props){
		super(props)
		// this.renderLoginSignup = this.renderLoginSignup.bind(this);
  //   	this.renderLogout = this.renderLogout.bind(this);
	}

	render(){

    //upload a file
		return(
      <div>
        Welcome
      </div>
			)
	}
 }
