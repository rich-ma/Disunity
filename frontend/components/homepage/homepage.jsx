import React from 'react';
import { Link, Route } from 'react-router-dom';
import Header from './header';
import Splash from './splash';
import Footer from './footer';
import ServerIndexContainer from '../dashboard/server/server_index_container';
import ServerHeaderContainer from '../dashboard/server/server_header_container';
import ChannelIndexContainer from '../dashboard/channel/channel_index_container';
import UserInfoContainer from '../../components/dashboard/user/user_info_container';
import MessageIndexContainer from '../dashboard/message/message_index_container';
import { ProtectedRoute } from '../../util/route_util';
import HeaderContainer from '../dashboard/header/header_container';
import UserListContainer from '../dashboard/user/user-list-container';

const Homepage = ({ currentUser }) => {
  
  const dashboard = () => <div className="dashboard-container">
      <div className="server-index-col">
        <img className="home-link" src="https://www.shareicon.net/data/512x512/2017/06/21/887435_logo_512x512.png" alt="" />
        <span className="home-server-span" />
        <Route path="/" component={ServerIndexContainer} />
      </div>

      <div className="server-channel-col">
        <div>
          <Route path="/servers/:serverId" component={ServerHeaderContainer} />
          <Route path="/servers/:serverId" component={ChannelIndexContainer} />
        </div>
        <Route path="/" component={UserInfoContainer} />
      </div>

      <div className="message-user-container">
        <ProtectedRoute path="/servers/:serverId/:channelId" component={HeaderContainer} />
        <div className="channel-users-container">
          <div className="channel-message-col">
            <ProtectedRoute path="/servers/:serverId/:channelId" component={MessageIndexContainer} />
          </div>
          <div className="server-users-col">
            <ProtectedRoute path='/servers/:serverId/:channelId' component=
            {UserListContainer} />
          </div>
        </div>
      </div>
      
    </div>;
  
  const splash = () => {
    return (
    <div className="homepage-container">
      <Route path='/' component={Header}/>
      <Route path='/' component={Splash}/>
      <Route path='/' component={Footer}/>
    </div>
  )};
  
  return currentUser ? dashboard() : splash();
};


export default Homepage;

