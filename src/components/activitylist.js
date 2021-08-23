import React, { useState } from 'react';
import { Accordion, Card, Icon } from 'semantic-ui-react';
import ActivityListItem from './activityListItem';

function ActivityList({ myActivityGroups, email }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  function handleClick(e, titleProps) {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex);
  }

  function getAllActivityGroups() {
    return myActivityGroups && myActivityGroups.map((ag, index) => (      
        <div key={index} >
          <Accordion.Title
            active={activeIndex === index}
            index={index}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            {ag.activityGroupName}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
            <Card.Group>
              {getActivityListItems(ag.activities)}
            </Card.Group>
          </Accordion.Content>
        </div>
    ));
  }

  function getActivityListItems(activities) {
    return activities.map(({ activityId, activityName, activityDesc, activityActionLink, activityPoints, pointsEarned, activityBadge, activityGroupId, manual }) => (
      <ActivityListItem
        key={activityId} id={activityId} points={activityPoints} pointsEarned={pointsEarned}
        name={activityName} description={activityDesc} link={activityActionLink} manual={manual}
        challengeName={activityGroupId} userEmail={email}
      />
    ))
  }

  return myActivityGroups && email && (
    <Accordion fluid styled>
      {getAllActivityGroups()}
    </Accordion>
  );
}

export default ActivityList;