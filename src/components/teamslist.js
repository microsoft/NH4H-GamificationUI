import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import TeamListItem from './teamlistitem';

class TeamsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teams: [],
      challenges:[],
      activeIndex: 0
    }
    this.joinOrLeaveTeam=this.joinOrLeaveTeam.bind(this);
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  
  componentDidUpdate(prevProps,prevState) {
    if(prevProps.teams != this.props.teams){
    let newt=this.groupBy(this.props.teams,'challengeName');
    let newc= Object.getOwnPropertyNames(newt);
    this.setState({
      teams:newt,
      challenges:newc
    });
  }
  }

  joinOrLeaveTeam(type,id){
    this.props.Callback(type,id);
  }

  groupBy(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i][property]]) hash[array[i][property]] = [];
        hash[array[i][property]].push(array[i]);
    }
    return hash;
}
  // {this.getTeamListItems(this.state.teams[c])}
  getChallengesList=()=>{
    return this.state.challenges.map((c, index)=>(
      <div key={index} >
      <Accordion.Title
        active={this.state.activeIndex === index}
        index={index}
        onClick={this.handleClick}
        >
        <Icon name='dropdown' />
       {c}
      </Accordion.Title>
      <Accordion.Content active={this.state.activeIndex === index}>
        <div className="ui special stackable cards">
          {this.getTeamListItems(this.state.teams[c])}
        </div>
      </Accordion.Content>
      </div>
    ));
  }
  getTeamListItems=(teamlist)=>{
  return teamlist.map( ({teamId, teamName, teamDescription,skillsWanted,tblTeamHackers,challengeName,msTeamsChannel}) => ( 
    <TeamListItem 
      Callback={this.joinOrLeaveTeam} 
      key={teamId} id={teamId} 
      name={teamName} description={teamDescription}
      isTeamMember={teamId==this.props.myteam}
      challengeName={challengeName}      
      skills={skillsWanted}
      teamslink={msTeamsChannel}
      />
  ))
  }
  //{this.getTeamListItems(this.state.teams)}
  render() {
    return(
      <Accordion fluid styled>
        {this.getChallengesList()}      
      </Accordion>
    );
  }
}

export default TeamsList;
