(function(){

    // 接口用来定义一个类的结构
    // 一个类应该包含哪些类与方法
    // 也可以当作类型声明去使用
    interface myInterface {
        // 类似于Java
        name:string;
        age:number;
    };

    // 有点像前面的type
    type myType = {
        name:string,
        age:number
    }

    // type不可以重复写
    // type myType = {
    //     // 报错
    // }

    // interface可以重复写
    interface myInterface {
        // 不报错
        sex:string;

    }
    // 最终的myInterface的结果相当于俩myInterface合起来
    // name
    // age
    // sex

    const obj : myInterface = {
        name:"张三",
        age:19,
        sex:"男",
       
    }

    /*
        接口在定义类的时候去限制类的结构
        接口中所以的属性都不能有实际的值
        接口里的方法都是抽象方法

    */

    interface myInter {
        id:string;
        // name:string = "张三";   // 报错,接口函数不能有初始化表达式
        // 这包括函数,不能有实现体,且返回值为void
        sayHello():void;
    }

    // 定义类时,可以去实现一个接口
    // 使用implements
    class myClass implements myInter {
        id: string;
        constructor(id:string){
            this.id = id;
        }
        sayHello(): void {
            console.log("hello");
        }
        
    }


})();