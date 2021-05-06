import React from 'react';
import { Checkbox, Label, Button } from 'semantic-ui-react';
import nh4h from '../apis/nh4h';

class ActivityListItem extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      members:1,
      userEmail:props.userEmail
    }
  }

  componentDidMount(){
  //   nh4h.get('/solutions/hackers/'+this.props.id)
  //   .then((response)=>{
      
  //     this.setState({members: response.data.userID.length});
  //   })
  // }
  // getTeamsLink=()=>{
  //   return this.props.teamslink?this.props.teamslink:DEF_TEAMSLINK;
  }

  addPoint = (event, data) => {
    // console.log("props addPoint", this.props.userEmail)
    let body ={
      UserEmail : this.props.userEmail,
      ActivityId : data.id
    }

    // += TODO: Get activity name and show it to user! 
    nh4h.post("/useractivity/Points", body) 
      .then((response) => {
        alert("Point added!");
        window.location.reload(false);

      });
  }

  render() {

    if (this.props.pointsEarned > 0) {
      return(
        <div className="teal card">
          <div className="content">
            <div className="ui checked">
              <Checkbox checked="true" className="hidden" readOnly="" tabIndex="0" label={this.props.name} />
              {/* <label style={{color: "##000", fontWeight:"bold" }}>{this.props.name}</label> */}
            </div> 
          </div>
          <div className="extra content">
            {this.props.description}
            <br/><br/> 
            { this.props.manual == true && 
              <Button positive disabled color='green'>
                Add Point
              </Button>    
            }
            <br /><br />
            { this.props.link != null && 
              <Label color="grey" as='a' target="_blank" href={this.props.link}>
                {this.props.link}
              </Label>    
            }
          </div>
        </div>
      )
    } else {
      return(
        <div className="teal card">
          <div className="content">
            <div className="ui disabled">
              <Checkbox className="hidden" disabled readOnly="" tabIndex="-1" label={this.props.name} />
            </div> 
          </div>
          <div className="extra content">
            {this.props.description}
            <br/><br/> 
            { this.props.manual == true && 
               <Button onClick={this.addPoint} id={this.props.id} positive color='green'>
                Add Point
              </Button>    
            }
            <br /><br />
            { this.props.link != null && 
              <Label color="grey" as='a' target="_blank" href={this.props.link}>
                {this.props.link}
              </Label>    
            } 
          </div>
        </div>
      )
    }
  }
}

export default ActivityListItem;