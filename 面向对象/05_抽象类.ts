(
    function(){
        // 我们不希望Animal用来创建对象,他只作为一个父类供子类继承
        // 使用abstract将其设置为抽象类
        // 生而为当爹
        // 
        // 可以添加抽象方法
        abstract class Animal {
            name:string;
            constructor(name:string){
                this.name = name;

            }

            // sayHello(){
            //     console.log("动物在叫");

            // }

            // 定义抽象方法,没有方法实现,只是定义
            abstract sayHello():void;

        }

        // const animal = new Animal("蛇");    // 报错

        class Dog extends Animal{

            // super的一般使用
            // sayHello(){
            //     super.sayHello();   // 动物在叫
            //     // super 相当于父类的一个实例
            // }

            // super在构造函数中的使用

            age:number;
            constructor(name:string, age:number){
                // this.age = age;
                // 发现报错
                // 如果父类写了构造函数而子类也要写构造函数，
                // 则在子类的构造函数中必须对父类的构造函数进行调用
                // 如下：
                super(name);
                // 发现仍然抱错，原因是写对其的调用必须放在最前边
                this.age = age;
            }

            sayHello(){
                // 如果不重写则会报错
                // 强制用户写抽象方法
            }
        }

        const dog = new Dog('旺财',3);
        dog.sayHello();


       
    }


)