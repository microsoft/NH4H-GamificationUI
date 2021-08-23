import React, { useState } from 'react';
import { Button, Card, Checkbox, Grid, Label, Segment } from 'semantic-ui-react';
import nh4h from '../apis/nh4h';
import { ApiScope } from '../apis/nh4h';

// class ActivityListItem extends React.Component {

//   constructor(props){
//     super(props);
//     this.state={
//       members:1,
//       userEmail:props.userEmail,
//       msal:props.msalInstance
//     }
//   }

function ActivityListItem(props) {

  function addPoint(event, data) {
    // console.log("props addPoint", this.props.userEmail)
    let body = {
      UserEmail: props.userEmail,
      ActivityId: data.id
    }

    // += TODO: Get activity name and show it to user! 
    nh4h.post("/useractivity/Points", body)
      .then((response) => {
        alert("Point added!");
        window.location.reload(false);
      });
  }


  if (props.pointsEarned > 0) {
    return (
      <Card>
        <Card.Content>
          <Card.Header style={{ "padding": "10px 0px" }}><Checkbox checked={true} className="hidden" tabIndex="0" label={props.name} disabled fitted={true} /></Card.Header>
          <Card.Meta style={{ "color": "#777" }}>{props.points} point(s) added!</Card.Meta>
          <Card.Description style={{ "borderTop": "0.5px solid  #eee", "paddingTop": "6px", "color": "#eee" }}>
            {props.description}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  } else {
    return (
      <Card color="orange">
        <Card.Content>
          <Card.Header style={{ "padding": "10px 0px" }}><span style={{ "fontWeight": "bold" }}>{props.name}</span></Card.Header>
          <Card.Meta></Card.Meta>
          <Card.Description style={{ "borderTop": "0.5px solid  #eee", "paddingTop": "6px" }}>
            {props.description}
            <br /><br />
            {props.link != null &&
              <Label color="grey" as='a' target="_blank" href={props.link}>
                {props.link}
              </Label>
            }
            <br /><br />
            {props.manual == true &&
              <Button size="tiny" onClick={addPoint} id={props.id} positive>
                Add Point
              </Button>
            }

          </Card.Description>
        </Card.Content>
      </Card>
    )
  }

}

export default ActivityListItem;