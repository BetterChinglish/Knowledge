class Person {

    // 私有化属性,使外界无法直接访问

    private name:string;
    private age:number;

    constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }

    // getName(){
    //     return this.name;
    // }

    // setName(name:string){
    //     // 虽然可以修改,但必须通过程序员的方法来修改
    //     this.name = name;
    // }

    // getAge(){
    //     return this.age;
    // }
    // setAge(age:number){
    //     if(age<0){
    //         console.log("年龄小于0,不合法")
    //         return;
    //     }
    //     this.age = age;
    // }

    // ts提供特殊getter与setter方法
    // 使用这种形式用起来和平常访问属性一样
    get myName(){
        return this.name;
    }
    get myAge(){
        return this.age;
    }

    set myName(name:string){
        this.name = name;

    }
    set myAge(age:number){
        if(age>0)
        this.age = age;
        
    }
}


// public 任意访问

// private 只能本类访问

// protected 只能在本类与其子类中访问