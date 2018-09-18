import React from 'react';
import MessageForm from './message_form';
import MessageIndexItem from './message_index_item';

class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
      channel: this.props.channel
    };
    this.createSocket();
  }

  createSocket() {
    const that = this;
    let cable = Cable.createConsumer(`ws://${location.host}/cable`);
    that.chats = cable.subscriptions.create({
      channel: 'ChatChannel',
      channel_id = that.props.channel.id,
    }, {
        connected: () => {},
        received: (data) => {
          if (data.type === 'destroy'){
            that.props.removeMessage(data.message.id);
          } else {
            that.props.receiveMessage(data.message);
          }
        },
        create: function(message) {
          this.perform('create', {
            content: message.content,
            channelId: message.channelId,
            authorId: message.authorId
          });
        },
        delete: function(message) {
          this.perform('destroy', {
            id: message.id
          })
        },
        update: function(message) {
          this.perform('update', {
            content: message.content,
            channelId: message.channelId,
            authorId: message.authorId
          })
        }
      });
  }
  
  static getDerivedStateFromProps(props, state) {
    return {
      messages: props.messages,
      channel: props.channel
    };
  }

  componentDidUpdate(oldProps, prevState) {
    if (oldProps.messages.length !== this.props.messages.length) {
      this.props.fetchServers();
      if (this.chats) {
        this.chats.unsubscribe()
      }
      this.createSocket();
      this.scrollToBottom();
      return;
    }

    for (let i = 0; i < oldProps.messages.length || i < this.props.messages.length; i++) {
      if (oldProps.messages[i].id !== this.props.messages[i].id) {
        this.props.fetchServers();
        if (this.chats) {
          this.chats.unsubscribe()
        }
        this.createSocket();
        break;
      }
    }
    this.scrollToBottom();
  }

  scrollToBottom() {
    const messages = document.getElementById('message-log');
    if (messages) {
      messages.scrollTop = messages.scrollHeight;
    }
  }

  render() {
    if (this.props.loading) return null;
    const { channel, users, currentUserId } = this.props;
    const { messages } = this.state;

    return(
      <div className="message-container">
       <div className="message-index">
          <ul className="message-index-log">
            {messages.map(message => (
              <MessageIndexItem
                message={message}
                key={message.id}
                author={users[message.authorId]}
                currentUserId={currentUserId}
              />
            ))}
          </ul>
        </div>
        <MessageForm
          userId={currentUserId}
          chats={this.chats}
          channel={channel}
        />
      </div>


    );
}

export default MessageIndex;