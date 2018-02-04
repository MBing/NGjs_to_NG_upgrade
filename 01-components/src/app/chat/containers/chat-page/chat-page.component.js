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
    constructor ($ngRedux, threadsService) {
        this.$ngRedux = $ngRedux;
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, threadsService)(this);
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
        this.activeThread.messages.push({
            author: this.currentUser,
            text: message,
            sentAt: new Date(),
        });
    }

    threadSelected (thread) {
        fetchMessages(thread);
    }
  }
};

export default ChatPageComponent;
