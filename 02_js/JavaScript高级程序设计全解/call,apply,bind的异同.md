# 相同

都是改变某函数的this指针的对象


# 区别

第二个参数
call 与 bind 都是(this, 参数， 参数， 。。。。 ， 参数)

apply是(this, [参数1, 参数2, .... , 参数n])

返回值bind为一个函数,即改变this和传入参数后的函数, 需要再加个()进行调用

obj.func.call(obj, param1, param2)

obj.func.apply(obj, [param1, param2, ...])

obj.func.bind(obj, param1, param2,....)()

