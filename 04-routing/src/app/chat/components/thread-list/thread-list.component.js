import template from './thread-list.html';

const ThreadListComponent = {
  bindings: {
    name: '@',
    threads: '<',
    active: '<',
    onThreadSelected: '&'
  },
  templateUrl: template
};

export default ThreadListComponent;
