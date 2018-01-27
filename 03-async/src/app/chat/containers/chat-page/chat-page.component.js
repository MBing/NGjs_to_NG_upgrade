import template from './chat-page.html';
import {
  getChannels,
  getDirectMessages,
  getCurrentThread
} from '../../shared/threads/threads.selectors';
import {
  getCurrentUser
} from '../../shared/users/users.selectors';

const ChatPageComponent = {
  bindings: {},
  templateUrl: template,
  controller: class ChatPageController {
    /* @ngInject */
    constructor($ngRedux, threadsService) {
      this.unsubscribe = $ngRedux.connect(this.mapStateToThis, threadsService)(this);
    }

    $onDestroy() {
      this.unsubscribe();
    }

    // Which part of the Redux global state does our component want to receive?
    mapStateToThis(state) {
      return {
        channels: getChannels(state),
        directMessages: getDirectMessages(state),
        activeThread: getCurrentThread(state),
        currentUser: getCurrentUser(state)
      };
    }

    threadSelected(thread) {
      this.fetchMessages(thread);
    }

    sendMessage(messageText) {
      if(messageText.length > 0) {
        this.postMessage(
          this.activeThread,
          {
            author: this.currentUser,
            text: messageText
          }
        );
      }
    }
  }
};

export default ChatPageComponent;
