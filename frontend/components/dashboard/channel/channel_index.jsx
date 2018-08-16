import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ChannelIndexItem from './channel_index_item';

class ChannelIndex extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.addChannel = this.addChannel.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchServers();
  // }

  static getDerivedStateFromProps(props, state) {
    if (props.channels.length === state.channels.length) {
      return state;
    }
    return props;
  }

  addChannel(server){
    return (
      <div className="channel-new"
        onClick={() => this.props.openModal('newChannel', server)}><i className="fas fa-plus"></i></div>
    )
  }

  render() {
    const { currentUser, currentServer, channels, deleteChannel, updateChannel } = this.props;
    const admin = (currentServer.adminId === currentUser.id ? true : false);
    if (channels === undefined) return null;

    return (
      <div className='channel-index-container'>
        <div className='channel-index-header'>
          <p>Text Channels</p>
          { currentServer.adminId === currentUser.id ? this.addChannel(currentServer) : null }
        </div>
        <ul className='channel-index-list'>
          {channels.map(channel =>(
            <ChannelIndexItem key={channel.id} channel={channel} 
            deleteChannel={deleteChannel} updateChannel={updateChannel} admin={admin} server={currentServer}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(ChannelIndex);