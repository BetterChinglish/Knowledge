#include <iostream>

using namespace std;


int main() {

	int a[9] = { 1,0,0,1,0,1,1,0,0 };

	

	
	
	int newBit;
	for (int i = 0; i < 520; i++)
	{
		
		{
			if (a[0] == a[3])
			{
				newBit = 0;
			}
			else
			{
				newBit = 1;
			}
		}
		
		{
			if (newBit == a[5])
			{
				newBit = 0;
			}
			else
			{
				newBit = 1;
			}
		}

		
		{
			if (newBit == a[6])
			{
				newBit = 0;

			}
			else
			{
				newBit = 1;
			}
		}
		
	
		
	

		cout << a[0];

		for (int j = 0; j <= 7; j++)
		{
			a[j] = a[j + 1];
		}

		a[8] = newBit;

		

		/*for (int j = 0; j < 9; j++)
		{
			cout << a[j];
		}

		cout << endl;*/
		
	}
	return 0;
}