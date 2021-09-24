#include <stdio.h>

#define msg "i am a symbolic string constant"
#define maxLength 81

int main(void)
{
	// puts()函数只显示字符串，
	// 而且自动在显示的字符串末尾加上换行符
	char words[maxLength] = "something in an array";
	const char* pt1 = "something in a pointer";

	puts("herer are some strings");
	puts(msg);
	puts(words);
	puts(pt1);

	words[8] = 'p';

	puts(words);
	return 0;
}