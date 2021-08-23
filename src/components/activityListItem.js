import React, { useState } from 'react';
import { Button, Card, Checkbox, Grid, Label, Segment } from 'semantic-ui-react';
import { useMsal } from '@azure/msal-react';
import nh4h from '../apis/nh4h';
import { HackApiScope } from '../apis/nh4h';

function ActivityListItem(props) {
  const { instance, accounts } = useMsal();

  async function getAccessToken() {
    let req = {
      scope: [HackApiScope],
      account: accounts[0]
    };

    let resp = await instance.acquireTokenSilent(req);
    return resp.accessToken;
  }

  async function addPoint(event, data) {
    let body = {
      UserEmail: props.userEmail,
      ActivityId: data.id
    }

    // += TODO: Get activity name and show it to user! 
    let token = await getAccessToken();
    let apiClient = nh4h(token);
    apiClient.post("/useractivity/Points", body)
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