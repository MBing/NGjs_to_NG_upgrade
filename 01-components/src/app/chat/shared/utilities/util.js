export const uuid = () => {
    /* jshint bitwise:false */
    let random;
    let uuid = '';

    for(let i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;

      switch (i) {
          case 8, 12, 16, 20:
              uuid += '-';
              break;
          default:
              uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random));
              break;
      }

      return uuid;
    }
};
