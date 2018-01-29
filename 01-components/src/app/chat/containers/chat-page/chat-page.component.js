import template from './chat-page.html';

const ChatPageComponent = {
  bindings: {},
  templateUrl: template,
  controller: class ChatPageController {
    /* @ngInject */ 
    constructor() {

      const eigenjoy = {
        id: 'eigenjoy',
        isClient: true,
        name: 'eigenjoy'
      };
      const auser = {
        id: 'auser',
        name: 'auser'
      };

      this.channels = [
        {
          id: 'angular',
          name: 'angular',
          type: 'channel',
          messages: [
            { 
              author: eigenjoy, 
              text: 'hi',  
              sentAt: new Date()
            },
            { 
              author: auser, 
              text: 'hey',  
              sentAt: new Date()
            },
            {
              author: eigenjoy,
              text: 'how are you',
              sentAt: new Date()
            }
          ]
        },
        {
          id: 'redux',
          name: 'redux',
          type: 'channel',
          messages: [
            { 
              author: eigenjoy, 
              text: 'Redux is cool',  
              sentAt: new Date()
            },
            { 
              author: auser, 
              text: 'It really is!',  
              sentAt: new Date()
            }
          ]
        }
      ];

      this.directMessages = [{
        id: 'auser',
        name: 'auser',
        type: 'dm',
        messages: []
      }];

      this.activeThread = this.channels[0];
      this.currentUser = eigenjoy;
    }

    sendMessage(message) {
      console.log(message);
    }

    threadSelected(message) {
      this.activeThread = _.find( this.channels, { id: message.id });
    }
  }
};

export default ChatPageComponent;
