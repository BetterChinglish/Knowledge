#include <stdio.h>


int main()
{
	// ������Ҫ����ǰһ�ڵ�ʵ��

	char arr[] = "this is arr";
	const char* p = "this is p";

	puts("arr: "); puts(arr);
	puts("p  : "); puts(p);
	putchar('\n');

	// ���߶�����ʹ�������ʾ��
	puts("arrʹ�������ʾ�����ǰ5���ַ�:");
	for (int i = 0; i < 5; i++)
	{
		putchar(arr[i]);
	}
	putchar('\n');putchar('\n');
	puts("pʹ�������ʾ�����ǰ5���ַ�:");
	for (int i = 0; i < 5; i++)
	{
		putchar(p[i]);
	}
	putchar('\n'); putchar('\n'); putchar('\n');

	// ���߶����Խ���ָ��ӷ�����
	puts("ʹ��ָ��ӷ����arrǰ����ַ�:");
	for (int i = 0; i < 5; i++)
	{
		putchar(*(arr + i));
	}
	putchar('\n'); putchar('\n');
	puts("ʹ��ָ��ӷ����pǰ����ַ�:");
	for (int i = 0; i < 5; i++)
	{
		putchar(*(p + i));
	}
	putchar('\n'); putchar('\n'); putchar('\n');

	// ֻ���Ըı�ָ������ֵ,�����Ըı���������ֵ
	while (*(p)!='\0')
	{
		putchar(*(p++));
	}
	return 0;
}