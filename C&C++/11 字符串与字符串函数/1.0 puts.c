#include <stdio.h>

#define msg "i am a symbolic string constant"
#define maxLength 81

int main(void)
{
	// puts()����ֻ��ʾ�ַ�����
	// �����Զ�����ʾ���ַ���ĩβ���ϻ��з�
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