// 很简单的原理
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(key, callback) {
    if(!this.events.has(key)) {
      this.events.set(key, []);
    }
    
    const listeners = this.events.get(key);
    listeners.push(callback);
  }
  
  emit(key, ...args) {
    if(!this.events.has(key)) {
      return;
    }
    const callbacks = this.events.get(key);
    for(const callback of callbacks) {
      callback(...args);
    }
  }
  
  offListener(key, callback) {
    if(!this.events.has(key)) {
      return;
    }
    this.events.set(key, this.events.get(key).filter(cb => cb !== callback));
  }
  
  offAllListeners(key) {
    if(this.events.has(key)) {
      this.events.delete(key);
    }
  }
}

const EventKeys = {
  GetHello: 'GetHello',

}

const eventEmitter = new EventEmitter();


const engCallback = (text) => {
  console.log('Received message:', text);
}
eventEmitter.on(EventKeys.GetHello, engCallback);
eventEmitter.on(EventKeys.GetHello, (text) => {
  console.log('请说', text);
});
eventEmitter.on(EventKeys.GetHello, (text) => {
  console.log('对的', text);
});
eventEmitter.on(EventKeys.GetHello, (text) => {
  console.log('哎不是哥们', text);
});


/*------test--------*/
setTimeout(() => {
  eventEmitter.emit(EventKeys.GetHello, 'Hello, World!');
  eventEmitter.offListener(EventKeys.GetHello, engCallback);
}, 3000)

setTimeout(() => {
  eventEmitter.emit(EventKeys.GetHello, '嗨嗨嗨');
  eventEmitter.offAllListeners(EventKeys.GetHello);
}, 5000)


setTimeout(() => {
  eventEmitter.emit(EventKeys.GetHello, '及你太美');
}, 8000)