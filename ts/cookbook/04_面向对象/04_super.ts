(
    function(){
        class Animal {
            name:string;
            constructor(name:string){
                this.name = name;

            }

            sayHello(){
                console.log("动物在叫");
            }

        }

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
        }
    }


)