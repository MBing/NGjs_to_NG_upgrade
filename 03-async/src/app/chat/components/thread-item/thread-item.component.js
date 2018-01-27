import template from './thread-item.html';
import _ from 'lodash';

const ThreadItemComponent = {
  bindings: {
    thread: '<',
    active: '<',
    onThreadSelected: '&'
  },
  templateUrl: template
};

export default ThreadItemComponent;
