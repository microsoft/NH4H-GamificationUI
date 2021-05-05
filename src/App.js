import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react'
import nh4h from './apis/nh4h';
import ActivityList from './components/activitylist';
import * as Msal from "msal";
import { Message } from 'semantic-ui-react';
import { Fragment } from 'react';
import { useParams } from 'react-router';

class App extends Component {
  constructor(props){
    super(props);
    let msalConfig = {
      auth: {
        clientId: 'b3544b0c-1209-4fe8-b799-8f63a0179fa0',
        authority: "https://login.microsoftonline.com/e773e193-89d3-44d9-ae4e-17766699f674",
        //redirectUri:"/loggedin" 
      }
    };
    let msalI = new Msal.UserAgentApplication(msalConfig);
    this.state = {
      msalInstance: msalI,
      email: null,
      visible: true,
      totalPts: 0,
      completedPts: 0
    }
  }

  inviteToJoin(id){
    console.log("invite user: " + id)
  }

  
  unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

  componentDidMount() {

    //get login info
    if (this.state.msalInstance.getAccount()) {
      let id = this.state.msalInstance.getAccount();
      this.setState({
        email: id.userName,
        username: id.name
      }, () => {
       
        // this.getUserID();
        this.getAllActivities(this.state.email);
      });

    

    } else {
      let loginRequest = {
        scopes: ["user.read"] // optional Array<string>
      };
      this.state.msalInstance.loginRedirect(loginRequest)
        .then(response => {
        })
        .catch(err => {
          // handle error
        });
    }
   
  }

  // getUserID = () => {
  //   let body = { UserMSTeamsEmail: this.state.email };
  //   nh4h.post('/users/msemail', body)
  //     .then((response) => {
  //       if(!response.returnError){
  //       this.setState({ 
  //         userObject:response.data,
  //         userid: response.data.userId
  //        });
  //       }
  //     });
  // }


  getAllActivities = (email) => {
    if(email) {
      nh4h.get("/useractivity/" + email) 
      .then((response) => {
        response.data.activities.map(a =>
          this.state.totalPts += a.totalPoints,
        )
        response.data.activities.map(a =>
          this.state.completedPts += a.completedPoints,
        )
        
        this.setState({
          myActivityGroups: response.data.activities,
          temp_username: response.data.userName,
          role: response.data.userRoleName 
        }) 
        
      });
    }

  };

  // renderActivities = () => {
  //   if (this.state.myActivityGroups) {
  //     return this.state.myActivityGroups.map((ma, index) => {
  //       console.log(ma.activityGroupName);
  //       return (
  //         <h4 key={index}>{ ma.activityGroupName } </h4>
  //       )
  //     })
  //   }
    
  // }
   
  handleDismiss = () => {
    this.setState({ visible: false })
  }
 
  render() { 
   
    const divStyle = {
      width: '80%'
    };

    if(this.state.myActivityGroups && this.state.myActivityGroups.length > 0) {
      return(
        <div>         
          <div className="ui segment">
            <div className="container">
              <div className="row">
                
                <div className="col-md-4"><h2 style={{float: "left" }}>Hello, {this.state.temp_username}</h2> <span style={{display: "block", float:"left"}}>({this.state.role})</span></div>
                <div style={{ clear: "left"}} className="col-md-4 offset-md-4"><h4>Your current progress: {this.state.completedPts} / {this.state.totalPts} </h4></div>
              </div>
            </div>
  
  
            <div>Here are the list of your activities. Enjoy!</div>
            
            <h2>All Activites</h2>
            <ActivityList myActivityGroups={this.state.myActivityGroups} email={this.state.email} />
          </div>
        </div>
      );
    } else if(this.state.username == null || this.state.username == ""){
      return(
        
        <div>
          {!this.state.username?<Message header='Contact Support!'
                  content='User Not found please ask for help in general channel.'
                />:""}
        </div>
      );
    } else {
      return (
        <div class="ui active centered inline loader"></div> 
      );
    }
    
  }
}

export default App;