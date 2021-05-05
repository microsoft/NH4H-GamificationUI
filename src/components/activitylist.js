import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import ActivityListItem from './activityListItem';

class ActivityList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      myActivityGroups: [],
    //   challenges:[],
      activeIndex: 0
    }
  }
  // render() {
   
  //   return(
  //     <div className="blue card">
  //       <div className="content">
  //         <div className="header">[RoleName] Activites</div>
  //       </div>
  //       <div className="content">
  //         <strong>Activities: </strong><br/>          
  //       </div>
  //     </div>
  //   )
  // }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  // componentDidUpdate(prevProps,prevState) {
  //   if(prevProps.teams != this.props.teams){
  //     let newt=this.groupBy(this.props.teams,'activityGroupId');
  //     let newc= Object.getOwnPropertyNames(newt);
  //     this.setState({
  //       teams:newt,
  //       challenges:newc
  //     });
  //   }
  // }

  getAllActivityGroups=()=>{
    if(this.props.myActivityGroups){
    return this.props.myActivityGroups.map((ag, index)=>(
      <>

      <div key={index} >
      <Accordion.Title
        active={this.state.activeIndex === index}
        index={index}
        onClick={this.handleClick}
        >
        <Icon name='dropdown' />
       {ag.activityGroupName}
      </Accordion.Title>
      <Accordion.Content active={this.state.activeIndex === index}> 
        <div className="ui special stackable cards">
          {this.getActivityListItems(ag.activities)}
        </div>
      </Accordion.Content>
      </div>
      </>
    ));
    }
  }

  getActivityListItems=(activities)=>{
    return activities.map( ({activityId, activityName, activityDesc, activityActionLink, activityPoints, pointsEarned, activityBadge, activityGroupId, manual}) => ( 
      <ActivityListItem 
        key={activityId} id={activityId} points={activityPoints} pointsEarned={pointsEarned}
        name={activityName} description={activityDesc} link={activityActionLink} manual={manual}
        challengeName={activityGroupId} userEmail={this.props.email}
      />
    ))
    }
  
  render() {
    return(
      <Accordion fluid styled>
        {this.getAllActivityGroups()}      
      </Accordion>
    );
  }
}

export default ActivityList;