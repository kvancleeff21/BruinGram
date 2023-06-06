import React, { Component } from 'react'
import SuggestionItem from './SuggestionItem';

class SuggestionLists extends Component {
  
  render() {
    const {profiles} = this.props;
    let filterSuggestions = profiles.filter((profile, index) => index <= 4) // filtering to get only first 5 suggestions
    let first5suggestions;
    if (profiles) {
       first5suggestions = filterSuggestions.map((profile) => (
         <SuggestionItem key={profile._id} profile={profile} />
       ));
    }
    
    return <div>{first5suggestions}</div>;
  }
}


export default SuggestionLists;