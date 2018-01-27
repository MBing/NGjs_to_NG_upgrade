import template from './chat-page.html';
import { 
  getCurrentUser
} from '../../../common/users/users.selectors';

const ChatPageComponent = {
  bindings: {},
  templateUrl: template,
  controller: class ChatPageController {
    /* @ngInject */ 
    constructor($ngRedux, $scope) {
      this.$ngRedux = $ngRedux;
      const unsubscribe = $ngRedux.connect(this.mapStateToThis, {})(this);
      $scope.$on('$destroy', unsubscribe);
    }

    // Which part of the Redux global state does our component want to receive?
    mapStateToThis(state) {
      return {
        currentUser: getCurrentUser(state)
      };
    }
  }
};

export default ChatPageComponent;
