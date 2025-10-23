#include <stdio.h>

int main() {

	// 用双引号括起来的内容称为字符串字面量（stringliteral），
	// 也叫作字符串常量（stringconstant）。

	// 编译器自动在字符串末尾加入 \0 字符

	// 如 'something' 就是一个字符串字面量

	// 从ANSI C标准起，如果字符串字面量之间没有间隔，
	// 或者用空白字符分隔，
	// C会将其视为串联起来的字符串字面量
	char str[20] = "some" "thing " 
							"here";
	puts(str);    // something here

	// 如果要在字符串里使用双引号(因为字符串本身由双引号括起)
	// 则需要使用转义字符(使用反斜杠\)
	puts("this is \"important\"");
	// this is "important"


	// 字符串常量属于  静态存储类别 ,
	// 也就是说在函数中使用字符串常量, 该字符串只会被存储一次,
	// 在整个程序的生命期内存在,
	// 即使函数呗调用多次.
	// 用双引号括起来的内容被视为指向该字符串存储位置的指针
	// 也就是比如第一次使用"this", 则找个地方存储"this"
	// 以后再使用"this", 则直接指向最开始存储它的那个地方

	const char *p1 = "something";
	printf("p1的地址:%p \n", p1);
	const char* p2 = "something";
	printf("p2的地址:%p \n", p2);
	// 发现两个地址完全一致, 代表"something"只存储了一次, 以后的使用都是调用而已


	// 考虑以下程序输出内容
	printf("%s, %p, %c \n", "we", "are", *"good");

	// 第一个%s, 输出字符串we,
	// 第二个%p, 表示输出地址, 也就是存储are的位置
	// 第三个%c, 表示一个字符, 由于*"good"代表存储"good "的地址,
	// 则应该是"good"的首字符


	return 0;
}