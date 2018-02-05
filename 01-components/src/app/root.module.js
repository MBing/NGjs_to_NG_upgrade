import '../sass/styles.scss';
import angular from 'angular';
import ngRedux from 'ng-redux';
import { thunk } from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './root.reducer';
import ngReduxRouter from 'redux-ui-router';
import RootComponent from './root.component';
import ChatModule from './chat/chat.module';
import { default as DevTools, runDevTools } from './devTools';

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
      ngReduxRouter,
      ChatModule.name,
  ])
  .component('root', RootComponent);

if (process.env.NODE_ENV === 'development') {
    RootModule
        .config(/*@ngInject*/ ($ngReduxProvider) => {
            $ngReduxProvider.createStoreWith(
                rootReducer,
                [ 'ngUiRouterMiddleware', thunk, createLogger() ],
                [ DevTools.instrument() ]);
        })
        .run(runDevTools)
        .run(createSampleData);
} else {
    RootModule
        .config(/*@ngInject*/ ($ngReduxProvider) => {
            $ngReduxProvider.createStoreWith(
                rootReducer,
                ['ngUiRouterMiddleware', thunk]
            );
        });
}

export default RootModule;
