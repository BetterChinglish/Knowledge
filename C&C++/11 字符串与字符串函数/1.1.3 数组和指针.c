#include <stdio.h>


int main()
{

	// 字符串数组中每个元素被初始化为字符串字面量对应的字符,
	// 字符串都作为可执行文件的一部分存储在数据段中.

	// 通常，字符串都作为可执行文件的一部分存储在数据段中
	// 当把程序载入内存时，也载入了程序中的字符串
	
	// 但是，程序在开始运行时才会为该数组分配内存
	// 这时才把字符串拷贝到数组里

	// 此时字符串有俩副本
	// 一个是静态内存里的字符串字面量
	// 一个是存储在arr1数组中的字符串

	// 此后, 编译器吧数组名识别为该数组的首元素地址的别名
	// 注意, 这里的数组名为地址常量, 不能更改,否则意味着改变了数组的存储位置
	char arr1[] = "this is arr1";
	char* p = "something";
	// arr1 = p;  // 报错, 表达式必须是可修改的左值, 意味着arr1不可修改

	// 但是可以进行arr1+1这种操作以遍历整个数组
	// 也就是说arr1从此即是一个常量, 常量不可修改

	// 而指针形式, 编译器也会在静态存储区预留字符串所需的空间
	// 而一旦执行程序, 它会为指针变量pt1留一个存储位置,
	// 并将字符串的地址存储在指针变量中;
	// 该遍历最初指向该字符串的首字符, 但是他的值可以改变,
	// 可以使用递增运算符, 如p++将他指向第二个字符
	printf("%c\n", *++p);  // o

	// 字符串字面量被视为const数据, p指向这个数据,
	// 所以应该声明p为const类型的指针
	// 这意味着不可以改变p指向内容的值, 但是可以改变p的指向

	// 如果把一个字符串字面量拷贝给一个数组,
	// 其实数组里的内容是一个副本, 复制过来的, 而不是字符串字面量本身
	// 这样就可以在数组里任意修改, 但是无法修改数组名代表的值, 
	// 因为数组名其实是数组首地址的一个别名, 也就是一个地址常量

	return 0;
}






