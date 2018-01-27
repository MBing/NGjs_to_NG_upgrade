import moment from 'moment';
import { setCurrentUser } from '../src/app/common/users/users.actions';
import {
  addThread,
  addMessage,
  selectThread
} from '../src/app/common/threads/threads.actions';
import _ from 'lodash';

export /*@ngInject*/ function createSampleData($ngRedux) {
  const uuid = () => {
    /*jshint bitwise:false */
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }

    return uuid;
  }

  /**
   * Users
   */
  const nate = {
    id: uuid(),
    isClient: true, // <-- notice we're specifying the client as this User
    name: 'eigenjoy'
  };
  const ari = {
    id: uuid(),
    name: 'auser'
  };
  const lukas = {
    id: uuid(),
    name: 'simpulton'
  };
  const houssein = {
    id: uuid(),
    name: 'houssein'
  };
  const todd = {
    id: uuid(),
    name: 'toddmotto'
  };

  const users = [nate, ari, lukas, houssein, todd];

  /**
   * Threads
   */
  const angularThread = {
    id: uuid(),
    name: 'angular',
    type: 'channel'
  };
  const graphQLThread = {
    id: uuid(),
    name: 'graphql',
    type: 'channel'
  };
  const materialThread = {
    id: uuid(),
    name: 'material',
    type: 'channel'
  };
  const friendsThread = {
    id: uuid(),
    name: 'friends',
    type: 'channel'
  };
  const cliThread = {
    id: uuid(),
    name: 'angular-cli',
    type: 'channel'
  };
  const protractorThread = {
    id: uuid(),
    name: 'protractor',
    type: 'channel'
  };
  const universalThread = {
    id: uuid(),
    name: 'universal',
    type: 'channel'
  };
  const angularfireThread = {
    id: uuid(),
    name: 'angularfire',
    type: 'channel'
  };

  // DMs
  const dmThreads = users.map(u => ({
    id: uuid(),
    name: u.name,
    type: 'dm'
  }));

  const threads = [
    angularThread,
    graphQLThread,
    materialThread,
    friendsThread,
    cliThread,
    protractorThread,
    universalThread,
    angularfireThread,
    ...dmThreads
  ];

  const msg = (thread, author, text, min) => addMessage(thread, {
    author,
    text,
    sentAt: moment().subtract(min, 'minutes').toDate()
  });
  const thread = (thread, cb) => cb(_.curry(msg)(thread));

  let messages = [
      // friends converstation
      ...thread(friendsThread, (msg) => [
        msg(ari,  "@eigenjoy, get up", (60 * 48)),
        msg(nate, "What?", (60 * 42)),
        msg(ari,  "You're in my seat.", (60 * 40)),
        msg(nate, "How is this your seat?", (60 * 20)),
        msg(ari,  "'Cause I was sitting there.", (60 * 18)),
        msg(nate, "But then you left.", 30),
        msg(ari,  "Well, it's not like I went to Spain. I went to the bathroom, you knew I was coming back.", 29),
        msg(nate, "What's the big deal, sit somewhere else.", 27),
        msg(ari,  "The big deal is I was sitting there last, so, that's my seat.", 22),
        msg(nate, "Well, actually the last place you were sitting was in there (points to the bathroom). Soo...", 19),
        msg(lukas,  "You guys, you know what, you know what, it doesn't matter, because you both have to go get dressed before the big vein in my head pops. So..", 18),
        msg(ari,  "All right, Lukas, I just have to do one thing, really quickly, it's not a big deal. (yells at Nate) GET UP!!", 17),
        msg(houssein,  "Hi.", 2),
      ]),

     // universal converstation
     // TODO something better here
      ...thread(universalThread, (msg) => [
        msg(ari,  "@eigenjoy, di you get the app running", (60 * 48)),
        msg(nate, "Yup", (60 * 42)),
        msg(ari,  "Okay great.", (60 * 40)),
      ])
  ];



  [
    setCurrentUser(nate),
    ...threads.map((t) => addThread(t)),
    ...messages,
    selectThread(friendsThread)
  ].map((a) => $ngRedux.dispatch(a));





}
