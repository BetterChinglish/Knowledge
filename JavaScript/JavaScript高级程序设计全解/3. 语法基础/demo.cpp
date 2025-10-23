#include <iostream>	
#include <string>
#include <iomanip>

using namespace std;

// 节点结构
typedef struct node {

	// 工人名称
	string name = "";

	// 工人工资， 0代表还未录入，-1代表输入结束
	double paid = -1;

	// 下一个节点
	struct node * next = NULL;
}Worker;	// 别名

// 创建链表
Worker * createList() {
	Worker* head = new Worker;
	Worker* cur = head;
	while (true)
	{
		string name;
		double paid;
		cout << "请输入姓名" << endl;
		cin >> name;
		
		cout << "请输入工资: " << endl;
		cin >> paid;

		cout << endl;

		if (paid == -1) {
			// 如果工人水平为-1则表示停止输入，舍弃该节点
			cout << "输入结束" << endl;
			break;
		}
		
		Worker* p = new Worker;
		p->name = name;
		p->paid = paid;

		cur->next = p;
		cur = cur->next;

	}

	return head;
}

void displayList(Worker* head) {
	Worker* cur = head;
	while (cur->next != NULL)
	{
		cur = cur->next;
		cout << cur->name << "的工资是: " << cur->paid << endl;
	}
}

// 遍历寻找工资最高者
Worker* maxList(Worker* head) {
	Worker* max = new Worker;
	Worker* cur = head;
	while (cur->next!=NULL)
	{
		cur = cur->next;
		if (cur->paid>max->paid)
		{
			max = cur;

		}
		
	}

	return max;
}

// 遍历计算平均工资
double averageList(Worker * head) {
	//double averageNum = 0;
	double sum = 0;
	int count = 0;

	Worker* cur = head;
	while (cur->next != NULL) {
		cur = cur->next;
		sum += cur->paid;
		count++;
	}
	return sum / count;
}

// 遍历寻找工资大于平均水平者，返回数量
int countList(Worker* head, double averageNum) {

	int count = 0;

	Worker* cur = head;
	while (cur->next!=NULL)
	{
		cur = cur->next;
		if (cur->paid>averageNum)
		{	
			count++;

		}
	}

	return count;
}

void delList(Worker* head, double money) {
	cout << "原链表为: " << endl;
	displayList(head);
	// 当前节点:
	Worker* cur = head->next;
	if (cur == NULL) {
		return;
	}
	// 上一个节点
	Worker* last = head;

	while (cur->next != NULL )
	{
		if (cur->paid == money)
		{
			cur = cur->next;
			delete last->next;
			last->next = cur;
		}
		if (cur->paid != money)
		{
			last = cur;
			cur = cur->next;
		}
	}

	cout << "删除完毕, 删除后链表为: " << endl;
	displayList(head);
}

Worker* mergeList(Worker* list1, Worker* list2, Worker* head) {
	if (list1->next == NULL || list2->next == NULL)
	{
		if (list1->next == NULL)
		{
			return	list2;

		}
		else
		{
			return list1;
		}
	}
	else
	{
		Worker* cur = head;
		Worker* cur1 = list1->next;
		Worker* cur2 = list2->next;

		// 0表示不知道cur1到末端还是cur2到末端了
		// 1表示cur1到末端了
		// 2表示cur2到末端了
		int charge = 0;

		// 当cur1与cur2都没有到达末尾时
		while (true)
		{
			Worker* p = new Worker;

			if (cur1->paid < cur2->paid) {
				p->name = cur1->name;
				p->paid = cur1->paid;
				if (cur1->next != NULL)
				{
					cur1 = cur1->next;
				}
				else {
					charge = 1;
				}

			}
			else
			{
				p->name = cur2->name;
				p->paid = cur2->paid;
				if (cur2->next != NULL)
				{
					cur2 = cur2->next;
				}
				else {
					charge = 2;
				}
			}

			cur->next = p;
			cur = cur->next;
			if (charge == 0)
			{
				continue;
			}
			else
			{
				break;
			}
		}


		// 其中一个到达末尾
		// 根据charge判断哪个到达了末尾
		if (charge == 1) {
			while (cur2 != NULL)
			{
				Worker* p = new Worker;
				p->name = cur2->name;
				p->paid = cur2->paid;
				cur->next = p;
				cur = cur->next;
				cur2 = cur2->next;
			}
		}
		if (charge == 2) {
			while (cur1 != NULL)
			{
				Worker* p = new Worker;
				p->name = cur1->name;
				p->paid = cur1->paid;
				cur->next = p;
				cur = cur->next;
				cur1 = cur1->next;
			}
		}

		return head;

	}
	

}



int main() {

	/*
	
	// 创建单向链表
	Worker * list = createList();
	
	*/
	


	// 功能1
/*
	
	// 输出工资水平最高者个人信息
	Worker* max = maxList(list);
	cout << "工资最高的是：" << max->name << endl << "他的工资是：" << max->paid << endl << endl;
	// 释放指针自身空间
	max = NULL;
*/

	// 功能2
/*
	// 获取链表中工人工资的平均值
	double averageNum = averageList(list);

	// 统计工资大于平均水平的人的个数
	int overAverageNum = countList(list, averageNum);
	cout << "工资大于平均水平的人数有: " << overAverageNum << "个" << endl;

*/

	// 功能3
/*
	// 删除薪资为100的工人
	double money;
	cout << "当前链表为: " << endl;
	displayList(list);
	cout << "请输入基本工资以删除工人: " << endl;
	cin >> money;
	delList(list, money);
*/
	
	// 功能4

	cout << "创建list1" << endl;
	Worker* list1 = createList();

	cout << "创建list2" << endl;
	Worker* list2 = createList();

	Worker* list = new Worker;

	mergeList(list1, list2, list);

	cout << "合并后的链表为: " << endl;
	displayList(list);

/*






*/
	return 0;
}