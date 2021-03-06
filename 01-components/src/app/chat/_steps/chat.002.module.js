import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import MatchWindowHeight from './shared/utilities/match-window-height.directive';

import ChatPageComponent from './containers/chat-page/chat-page.component';
import TeamHeaderComponent from './components/team-header/team-header.component';

const ChatModule = angular
  .module('components.chat', [
    uiRouter
  ])
  .config(/*@ngInject*/ ($stateProvider) => {
    $stateProvider
      .state('chat', {
        url: '',
        component: 'chatPage'
      })
  })
  .directive('matchWindowHeight', MatchWindowHeight)
  .component('chatPage', ChatPageComponent)
  .component('teamHeader', TeamHeaderComponent);

export default ChatModule;
