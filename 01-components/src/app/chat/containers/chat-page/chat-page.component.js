import template from './chat-page.html';
import { createSampleData } from '../../../../../config/sampleData';

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
    constructor ($ngRedux, $stateParams, threadsService) {
        this.$ngRedux = $ngRedux;
        this.$stateParams = $stateParams;
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, threadsService)(this);
    }

    $onInit () {
        createSampleData(this.$ngRedux, this.$stateParams)
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

    sendMessage (messageText) {
        if (messageText.length > 0) {
            this.postMessage(
                this.activeThread,
                {
                    author: this.currentUser,
                    text: messageText,
                }
            );
        }
    }

    threadSelected (thread) {
        fetchMessages(thread);
    }
  }
};

export default ChatPageComponent;
