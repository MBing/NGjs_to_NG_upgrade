import '../sass/styles.scss';
import angular from 'angular';
import ngRedux from 'ng-redux';
import createLogger from 'redux-logger';
import rootReducer from './root.reducer';
import RootComponent from './root.component';
import ChatModule from './chat/chat.module';
import { default as DevTools, runDevTools} from './devTools';
import { createSampleData } from '../../config/sampleData';

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

if (process.env.NODE_ENV === 'development') {
  RootModule
    .config(/*@ngInject*/ ($ngReduxProvider) => {
      $ngReduxProvider.createStoreWith(rootReducer, [ createLogger() ], [ DevTools.instrument() ]);
    })
    .run(runDevTools)
    .run(createSampleData)
} else {
  RootModule
    .config(/*@ngInject*/ ($ngReduxProvider) => {
      $ngReduxProvider.createStoreWith(rootReducer, []);
    })
}

export default RootModule;
