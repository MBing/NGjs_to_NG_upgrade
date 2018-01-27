import template from './chat-page.html';
import {
  addMessage,
  selectThread
} from '../../shared/threads/threads.actions';
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
    constructor($ngRedux) {
      this.$ngRedux = $ngRedux;
      this.unsubscribe = $ngRedux.connect(this.mapStateToThis, {})(this);
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
      this.$ngRedux.dispatch(selectThread(thread));
    }

    sendMessage(messageText) {
      if(messageText.length > 0) {
        this.$ngRedux.dispatch(addMessage(
          this.activeThread,
          {
            author: this.currentUser,
            text: messageText
          }
        ));
      }
    }
  }
};

export default ChatPageComponent;
