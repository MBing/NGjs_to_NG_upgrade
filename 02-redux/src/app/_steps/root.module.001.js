import '../sass/styles.scss';
import angular from 'angular';
import ngRedux from 'ng-redux';
import rootReducer from './root.reducer';
import RootComponent from './root.component';
import ChatModule from './chat/chat.module';

/**
 * @ngdoc module
 * @name root
 *
 * @description
 *
 * This is the root module
 *
 **/
const RootModule = angular
  .module('root', [
    ngRedux,
    ChatModule.name
  ])
  .component('root', RootComponent);

  RootModule
    .config(/*@ngInject*/ ($ngReduxProvider) => {
      $ngReduxProvider.createStoreWith(rootReducer);
    })

export default RootModule;
