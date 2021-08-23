import React, { useState, useEffect } from 'react';
import nh4h from './apis/nh4h';
import { HackApiScope } from './apis/nh4h';
import { Message, Progress } from 'semantic-ui-react';
import { useMsal } from "@azure/msal-react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";
import ActivityList from './components/activitylist';
import { SignInButton } from './components/SignInButton';

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [email, setEmail] = useState('');
  const [totalPts, setTotalPts] = useState(0);
  const [completedPts, setCompletedPts] = useState(0);
  const [activityGroups, setActivityGroups] = useState(null);
  const [username, setUsername] = useState('');
  const [roleName, setRoleName] = useState('');

  async function getAccessToken() {
    let req = {
      scopes: [HackApiScope],
      account: accounts[0]
    }

    let resp = await instance.acquireTokenSilent(req);
    return resp.accessToken;
  }

  useEffect(() => {
    const getAllActivities = async (email) => {
      if (email) {
        let accessToken = await getAccessToken();
        let apiClient = nh4h(accessToken);

        let resp = await apiClient.get("/useractivity/" + email);

        let totalPoints = resp.data.activities.reduce((sum, item) => sum + item.totalPoints, 0);
        let completedPoints = resp.data.activities.reduce((sum, item) => sum + item.completedPoints, 0);

        setTotalPts(totalPoints);
        setCompletedPts(completedPts);
        setActivityGroups(resp.data.activities);
        setUsername(resp.data.userName);
        setRoleName(resp.data.userRoleName);
        setEmail(email);
      }
    }

    //get login info
    if (isAuthenticated) {
      let id = accounts[0];
      getAllActivities(id.username);
    }
  }, [isAuthenticated]);


  if (activityGroups && activityGroups.length > 0 && username != null) {
    return (
      <div>
        <AuthenticatedTemplate>
          <div>
            <div className="ui segment">
              <div className="container">
                <div className="row">

                  <div className="col-md-4"><h2 style={{ float: "left" }}>Hello, {username}</h2> <span style={{ display: "block", float: "left" }}>({roleName})</span></div>
                  <div style={{ clear: "left" }} className="col-md-4 offset-md-4"><h4> </h4></div>
                  <div>
                    <Progress value={completedPts} total={totalPts} progress='ratio' indicating />
                  </div>
                </div>
              </div>

              <div className="ui icon message"><i aria-hidden="true" className="info icon"></i>As a participant you are encouraged to complete as many of the following activities as possible. They will not only teach you new and valuable skills but also help you get up and running with your team faster and make sure you are as engaged as possible.</div>

              <h2>All Activites</h2>
              <ActivityList myActivityGroups={activityGroups} email={email} />
            </div>
          </div>
        </AuthenticatedTemplate>
      </div>
    );
  } else {
    return (
    <div>
      <UnauthenticatedTemplate>
        <SignInButton />
      </UnauthenticatedTemplate>
      {!username ? <Message header='Contact Support!' content='User Not found please ask for help in general channel.' /> : ""}
    </div>
    );
  }
}

export default App;