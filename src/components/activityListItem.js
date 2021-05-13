import React from 'react';
import { Button, Card, Checkbox, Grid, Label, Segment } from 'semantic-ui-react';
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
        <Card>
          <Card.Content>
          <Card.Header style={{"padding": "10px 0px"}}><Checkbox checked="true" className="hidden" readOnly="" tabIndex="0" label={this.props.name} disabled fitted="true"/></Card.Header>
            <Card.Meta style={{"color":"#777"}}>{this.props.points} point(s) added!</Card.Meta>
            <Card.Description style={{"border-top": "0.5px solid  #eee", "padding-top": "6px", "color": "#eee"}}>
              {this.props.description}            
            </Card.Description>
          </Card.Content>
        </Card>
      )
    } else {
      return(
        <Card color="orange">
          <Card.Content>
            <Card.Header style={{"padding": "10px 0px"}}><span style={{"font-weight": "bold"}}>{this.props.name}</span></Card.Header>
            <Card.Meta></Card.Meta>
            <Card.Description style={{"border-top": "0.5px solid  #eee", "padding-top": "6px"}}>
              {this.props.description} 
              <br /><br />
              { this.props.link != null && 
                <Label color="gray" as='a' target="_blank" href={this.props.link}>
                  {this.props.link}
                </Label>    
              }
              <br /><br />
              { this.props.manual == true && 
                <Button size="tiny" onClick={this.addPoint} id={this.props.id} positive>
                  Add Point
                </Button>    
              }
           
            </Card.Description>
          </Card.Content>
        </Card>
      )
    }
  }
}

export default ActivityListItem;