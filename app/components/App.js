import React, { Component } from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Footer, FooterSection, FooterLinkList} from 'react-mdl'


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


export default class App extends Component{
	constructor(props){
		super(props)
		// this.renderLoginSignup = this.renderLoginSignup.bind(this);
  //   	this.renderLogout = this.renderLogout.bind(this);
	}

	render(){
		//console.log("propsLogout: ", this.props.logout)
		return(
      <div>
        <nav className="navbar navbar-inverse" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNav" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div id="logo">
                   <h1 id="nav-brand"> Mad (Hatter) Libs </h1>
                </div>
            </div>
            <div className="collapse navbar-collapse" id="myNav">
              <ul className="nav navbar-nav">
                <li><Link to="/play"> PLAY </Link></li>
                <li><Link to="/analyze"> ANALYZE </Link></li>
              </ul>
            </div>
          </div>
        </nav>

  			<div className="container child-container">
      		{this.props.children}
  			</div>

        <Footer size="mini">
          <FooterSection type="left" logo="Title">
              <FooterLinkList>
                  <a href="#">Help</a>
                  <a href="#">Privacy & Terms</a>
              </FooterLinkList>
          </FooterSection>
        </Footer>

      </div>
			)
	}

// 	renderLoginSignup(){
// 		return(
// 			<ul className="nav navbar-nav navbar-right">
// 			<li><Link to="/login" activeClassName="active"> Login </Link></li>
// 			</ul>
// 			)
// 	}

// 	renderLogout(){
// 		return (
//       	<ul className="nav navbar-nav navbar-right">
//         <WhoAmI/>
//       	</ul>
//     )

// 	}
 }
