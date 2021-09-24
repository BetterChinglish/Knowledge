#include <stdio.h>


int main()
{
	// 这里主要就是前一节的实践

	char arr[] = "this is arr";
	const char* p = "this is p";

	puts("arr: "); puts(arr);
	puts("p  : "); puts(p);
	putchar('\n');

	// 二者都可以使用数组表示法
	puts("arr使用数组表示法输出前5个字符:");
	for (int i = 0; i < 5; i++)
	{
		putchar(arr[i]);
	}
	putchar('\n');putchar('\n');
	puts("p使用数组表示法输出前5个字符:");
	for (int i = 0; i < 5; i++)
	{
		putchar(p[i]);
	}
	putchar('\n'); putchar('\n'); putchar('\n');

	// 二者都可以进行指针加法操作
	puts("使用指针加法输出arr前五个字符:");
	for (int i = 0; i < 5; i++)
	{
		putchar(*(arr + i));
	}
	putchar('\n'); putchar('\n');
	puts("使用指针加法输出p前五个字符:");
	for (int i = 0; i < 5; i++)
	{
		putchar(*(p + i));
	}
	putchar('\n'); putchar('\n'); putchar('\n');

	// 只可以改变指针名的值,不可以改变数组名的值
	while (*(p)!='\0')
	{
		putchar(*(p++));
	}
	return 0;
}