// 阅读下面代码,并在待实现区域书写代码
async function timeout(ms) {
    return new Promise(resolve => {
      setTimeout( () => {
        resolve();
      }, ms )
    });
}


/* 请实现SuperTask */
class SuperTask{
  constructor(){
    this.taskSize = 2; // 最大并发数
    this.currentSize = 0; // 当前并发数
    this.tasks = []; // 任务队列
  }
  
  add(task){
    return new Promise(resolve => {
      this.tasks.push( { task, resolve });
      this.run();
    })
  }

  run() {
    // 如果还有空间可以跑并且等待队列中有任务
    if(this.currentSize < this.taskSize && this.tasks.length > 0){
      // 则取出一个执行
      const { task, resolve } = this.tasks.shift();
      // 当前正在运行的任务+1
      this.currentSize++;
      // 执行
      task().then(() => {
        resolve();
        this.currentSize--;
        this.run();
      });
    }
  }
  
}

const superTask = new SuperTask();
function addTask(time, name){
  const label = `任务${name}, 完成`;
  console.time(label);
  superTask.add(() => {
    return timeout(time);
  }).then(() => {
    console.timeEnd(label);
  });
}

addTask( 10000, 1 );  // 10s后输出: 任务1完成
addTask( 5000, 2 ); // 5s后输出: 任务2完成
addTask( 3000, 3 ); // 8s后输出: 任务3完成
addTask( 4000, 4 ); // 12s后输出: 任务4完成
addTask( 5000, 5 ); // 15s后输出: 任务5完成

