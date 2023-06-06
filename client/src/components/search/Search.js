import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./search.css";
import { getAllProfiles } from "../../actions/profileActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from '../common/Spinner';

class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showMenu: false,
      searchInput: ""
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true, searchInput: event.target.value }, () => {
      document.addEventListener('click', this.closeMenu);
    });
    this.props.getAllProfiles();
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false, searchInput: "" }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  searchClick(event) {
    this.closeMenu(event);
  }

  render() {
    const {search, loading} = this.props.profile;
    const {auth} = this.props;
    let content;
    if(search === null || loading){
      content = <Spinner />;
    }
    if(search !== null && search.length > 0) {
      const searchProfiles = search.filter(profile => {
        return profile.user.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) && profile.user._id !== auth.user.id;
      });
      if (searchProfiles.length === 0) {
        content = <div style={{textAlign: "center", fontSize: "14px"}}>No search result</div>
      } else {
        content = searchProfiles.map(profile =>  {
          return (
          <Link  to={`/profile/${profile.handle}`} className="searchOption" onClick={this.searchClick.bind(this)}>
            <div className="searchData">
              <div className="searchAvatarBox">
                <img className="searchAvatar" src={profile.user.avatar}/>
              </div>
              <div className="searchNameBox">
                <div className="searchName">{profile.user.name}</div>
                <div className="searchHandle">{profile.handle}</div>
              </div>
            </div>
          </Link>
        )});
      }
      // console.log(searchProfiles);
      
    } 
        
    return (
      <div className='searchBox d-none d-xl-block'>
        <span className='fa fa-search searchIcon'></span>
        <input
          className='searchInput'
          type='search'
          placeholder='Search..'
          onChange={this.showMenu}
          value={this.state.searchInput}
        />

        {this.state.showMenu ? (
          <div className='searchDropDown'>
            <div
              className='searchDropDownMenu'
              ref={(element) => {
                this.dropdownMenu = element;
              }}
            >
              <div className='searchOptions'>{content}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getAllProfiles,
})(Search);