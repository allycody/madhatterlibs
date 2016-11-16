import React, { Component } from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import axios from 'axios'


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

	
		


export default class Analyze extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		// this.renderLoginSignup = this.renderLoginSignup.bind(this);
  //   	this.renderLogout = this.renderLogout.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("SUBMIT")
		// console.log(e.target.country.value);
		let message = e.target.message.value;
		// let address = {
		// 	fullName: e.target.fullName.value,
		// 	streetAddress: e.target.streetAddress.value,
		// 	municipality: e.target.municipality.value,
		// 	state: e.target.state.value
		// }
		console.log("MESSAGE: ", message)
		axios.post("/api/v3/tone", {message})
		.then(res => res.data)
		.then(res => console.log("RES: ", res))

		
}

	render(){


    //upload a file
		return(
      <div>
      	<a href='./App.js' download='Downloaded_File'>Download</a>
        <h3 className="page-header">ANALYSIS RESULTS</h3>
        <div> {Object.toString(this.props.inputAnalysis)} </div>
        <div> {Object.toString(this.props.completedAnalysis)} </div>

        
      </div>
			)
	}

 }
