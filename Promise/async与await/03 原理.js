// const co = require('co');


function get(str = '') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(str) {
        resolve(str + str);
      } else {
        resolve('hahaha')
      }
    }, 1000)
  });
}



// async function toGet() {
//   const data = await get();
//   const result = await get(data);
//   return result;
// }

function* toGet() {
  const data = yield get();
  return yield get(data);
}

function co(itor) {
  return new Promise((resolve, reject) => {

    const toNext = function(data) {
      const { value, done } = itor.next(data);

      if(done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(value => {
          toNext(value)
        })
      }
    }
    toNext();
  })
}

// toGet().then(res => console.log(res));

const result = co(toGet());
result.then(res => console.log(res));