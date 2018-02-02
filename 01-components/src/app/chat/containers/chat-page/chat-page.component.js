import template from './chat-page.html';

import {
    getChannels,
    getDirectMessages,
    getCurrentThread,
} from '../../shared/threads/threads.selectors';

import { getCurrentUser } from '../../shared/users/users.selectors';

const ChatPageComponent = {
  bindings: {},
  templateUrl: template,
  controller: class ChatPageController {
    /* @ngInject */ 
    constructor ($ngRedux) {
        this.$ngRedux = $ngRedux;
        // const unsubscribe = $ngRedux.connect(this.mapStateToThis, {})(this);
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, {})(this);
    }

    $onDestroy () {
        this.unsubscribe();
    }

    mapStateToThis (state) {
        return {
            channels: getChannels(state),
            directMessages: getDirectMessages(state),
            activeThread: getCurrentThread(state),
            currentUser: getCurrentUser(state),
        };
    }

    sendMessage (message) {
      console.log(this.activeThread);
      this.activeThread.messages.push({
          author: this.currentUser,
          text: message,
          sentAt: new Date(),
      });
    }

    threadSelected (message) {
      this.activeThread = _.find( this.channels, { id: message.id });
    }
  }
};

export default ChatPageComponent;
