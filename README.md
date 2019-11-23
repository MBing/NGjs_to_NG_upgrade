## Deprecated !!! The authors of the NG-Book where unable to help and the migration is NOT complete.

# Migration from AngularJS to Angular example APP

Testing how to properly migrate from Angular 1.x to a newer version of Angular +2.
Using a sample application in the form of a Slack clone to do so. 

Working with a styleguide etc.

FIXES
=====

Fixes in package.json:
```
    "@uirouter/angularjs": "^1.0.13" # "angular-ui-router": "^1.0.0-beta.2"
```
Fixes while trying to run `npm start`:
```
    npm config set python /usr/bin/python
```
