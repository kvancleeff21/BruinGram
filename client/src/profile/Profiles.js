import React, { Component } from 'react'
import ProfileCard from './ProfileCard';
import { getSuggestionList } from "../../actions/profileActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from '../common/Spinner';
class Profiles extends Component {
  componentDidMount() {
    this.props.getSuggestionList();
  }
  render() {
    let content;
    const {profiles, loading} = this.props.profile;
    console.log(this.props.profile.profiles);
    if(profiles === null || loading === true){
    content = <Spinner />;
    } 

    if(profiles !== null && profiles.length > 0) {
      content = profiles.map(profile => <ProfileCard profile={profile} key={profile._id}/>);
    } 
    
    if (profiles !==null && profiles.length === 0){
      content = <div style={{textAlign: "center", fontSize: "22px"}}>No suggestions. You already follow all users.</div>
    }
    return (
      <div className='container d-flex flex-wrap' style={{ marginTop: "30px" }}>
        {content}
      </div>
    )
  }
}
Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getSuggestionList: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getSuggestionList,
})(Profiles);
