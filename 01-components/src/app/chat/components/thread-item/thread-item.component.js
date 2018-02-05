import template from './thread-item.html';

const ThreadItemComponent = {
  bindings: {
    thread: '<',
    active: '<',
    onThreadSelected: '&'
  },
  templateUrl: template,
};

export default ThreadItemComponent;
