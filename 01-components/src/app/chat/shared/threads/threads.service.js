import { uuid } from '../utilities/util';

import {
    getMessagesRequest,
    postMessageRequest,
    selectThread,
} from './threads.actions';

/* @ngInject */
export default function ThreadsService($http) {
    const fetchMessages = thread => dispatch => {
        dispatch(getMessagesRequest(thread));

        return $http.get('http://localhost:3000/messages/')
                    .then(response => response.data)
                    .then(data => dispatch(selectThread(thread, data)))
                    // .catch(error => dispatch(selectThreadFailed(error)));
                    .catch(error => console.log(error));
    };

    const postMessages = (thread, messageArgs) => dispatch => {
        dispatch(postMessageRequest(thread));

        const defaults = {
            id: uuid(),
            sentAt: new Date(),
            thread: thread,
        };

        const message = Object.assign({}, defaults, messageArgs);

        return $http.post(`http://localhost:3000/messages/`, message)
                    .then(response => response.data)
                    .then(data => dispatch(addMessage(thread, data)))
                    // .catch(error => dispatch(selectThreadFailed(error)));
                    .catch(error => console.log(error));
    };

    return {
        fetchMessages,
        postMessages,
    };
}