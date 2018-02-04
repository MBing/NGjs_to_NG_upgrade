import {
    getMessagesRequest,
    selectThread,
} from './threads.actions';

/* @ngInject */
export default function ThreadsService($http) {
    const fetchMessages = thread => dispatch => {
        dispatch(getMessagesRequest(thread));

        return $http.get('http://localhost:3000/messages/')
                    .then(response => response.data)
                    .then(data => dispatch(selectThread(thread, data)));
    };

    return fetchMessages;
}