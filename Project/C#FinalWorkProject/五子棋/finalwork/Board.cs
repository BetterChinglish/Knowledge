using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace finalwork
{
    class Board
    {
        private int Row, Line;                             //棋盘行列数
        private int players;                               //记录玩家的数目
        private int[] count;                               //记录各玩家的棋子数
        public int num;                                    //记录棋盘中的棋子数目
        public int[] X, Y;                                 //记录棋子坐标，按落子次序依次存储
        public int[,] player;                              //记录棋盘的所有棋子，为哪个玩家所下
        private int[,,] style;                             //存储棋型
        public Board(int row, int line, int players)
        {
            Row = row;
            Line = line;
            count = new int[players];

            num = 0;
            this.players = players;
            X = new int[row * line];
            Y = new int[row * line];
            player = new int[row, line];

            style = new int[players, row, line];            //1到players存储各个空位置处周边各色棋子的最大棋型棋子数目
        }
        public void put(int x, int y, int player1)
        {
            if (num < X.Length && player[x, y] == 0)        //棋盘未满且当前位置无棋
            {
                count[player1 - 1]++;                         //棋子数加一
                player[x, y] = player1;                     //记录棋子
                X[num] = x;                                 //记录坐标
                Y[num] = y;
                num++;                                      //棋子计数
            }
        }


        //悔棋，回退
        public void retreat()
        {
            if (num > 0)
            {
                num--;                                          //棋子总数减一
                count[player[X[num], Y[num]] - 1]--;            //玩家棋子减一
                player[X[num], Y[num]] = 0;                     //清除棋子记录
                saveStyle(X[num], Y[num]);                      //更新该空位置的棋型
                refreshStyle(X[num], Y[num]);                   //更新周边空位置棋型
            }
        }

        //保存空位置棋型信息（保存空位置(x,y)周边的棋型到style数组中）
        private void saveStyle(int x, int y)
        {
            for (int i = 0; i < players; i++)
                style[i, x, y] = getStyle(x, y, i + 1);         //保存最大棋型
        }
        //获取坐标(x,y)处playerNum的最大棋型
        public int getStyle(int x, int y, int playerNum)
        {
            if (x < 0 || y < 0) return 0;

            int max = 0, num = 0;
            for (int i = 1; i <= 4; i++)            //分别判断4个方向的棋型
            {
                num = getStyle(x, y, i, playerNum); //获取棋型
                if (max < num) max = num;           //记录最大棋型
            }
            return max;
        }

        //判断有效坐标数（ 坐标(x,y)在w方向 1到num 个坐标范围内己方棋子或空位置数，仅含playerNum或0）
        public int ourSite(int x, int y, int w, int num, int playerNum)
        {
            //return sameNum(x, y, w, num, playerNum, false) + sameNum(x, y, w, num, 0, false);
            int tmp = 0;
            int[] A;
            for (int i = 1; i <= num; i++)      //在w方向统计有效位数
            {
                A = way(x, y, w, i);
                if (A[0] != -1)                 //在棋盘范围内
                {
                    if (player[A[0], A[1]] == playerNum || player[A[0], A[1]] == 0) tmp++;
                    else break;//其他值在中间
                }
                else break;
            }
            return tmp;
        }
        //计算坐标(x,y)在w*45度方向棋子playerNum的最大棋型  十位为棋子个数，个位为棋型状态(活棋)、0(死棋)、1(冲棋)
        private int getStyle(int x, int y, int w, int playerNum)
        {
            int num1, num2, tmp;
            int[] A;

            if (4 < w && w <= 8) w -= 4;        //限定w在1到4之间
            tmp = ourSite(x, y, w, 4, playerNum) + ourSite(x, y, w + 4, 4, playerNum);  //判断在空位置处w的正反方向有效坐标数

            if (tmp < 4) return 0;                                      //两边的有效位小于4为死棋
            else if (tmp == 4)                                          //两边的有效位等于4为冲棋
            {   //计算最大棋子数
                return getPlayerNum(x, y, w, 5, playerNum) * 10 + 1;
            }
            else
            {
                num1 = getPlayerNum(x, y, w, 5, playerNum);             //计算最大棋子数
                num2 = sameNum(x, y, w, num1, playerNum, true);         //计算w方向最大连续棋子数
                tmp = sameNum(x, y, w + 4, num1 - num2, playerNum, true);   //计算w反方向连续棋子数

                if (num1 != num2 + tmp)
                    return num1 * 10 + 1;                 //为冲棋
                else   //连续棋子端至少有棋子数加1个有效位，且棋子与当前坐标相邻，则为活棋
                {
                    A = way(x, y, w, num2 + 1);
                    if (!(A[0] != -1 && player[A[0], A[1]] == 0)) return num1 * 10 + 1; //冲棋

                    A = way(x, y, w + 4, tmp + 1);
                    if (A[0] != -1 && player[A[0], A[1]] == 0) return num1 * 10 + 2; //活棋
                    else return num1 * 10 + 1; //冲棋
                }
            }
        }



        //判断棋子（ 坐标(x,y)在w方向，1到num个坐标范围内playerNum的个数, 连续或非连续 ）
        private int sameNum(int x, int y, int w, int num, int playerNum, bool continuation)
        {
            int tmp = 0;
            int[] A;
            for (int i = 1; i <= num; i++)      //在w方向统计有效位数
            {
                A = way(x, y, w, i);
                if (A[0] != -1)                 //在棋盘范围内
                {
                    if (player[A[0], A[1]] == playerNum) tmp++;
                    else if (player[A[0], A[1]] != 0) break;//其他值在中间
                    else
                    {
                        if (continuation) break;//continuation==true为要求连续 
                    }
                }
                else break;
            }
            return tmp;
        }

        //判断玩家棋子数（ 在正反w方向包含坐标(x,y) 的num个坐标范围内，不要求连续的最大棋子数
        public int getPlayerNum(int x, int y, int w, int num, int playerNum)
        {
            int max = 0, tmp = 0;
            int[] A;
            for (int i = 0; i < num; i++)
            {
                A = way(x, y, w + 4, i);        //依次朝反方向平移
                if (A[0] != -1)                 //在棋盘范围内
                {
                    tmp = sameNum(A[0], A[1], w, num - 1, playerNum, false);    //计算w方向的棋子数
                    if (player[A[0], A[1]] == playerNum) tmp++;                 //判断自身棋型
                    else if (player[A[0], A[1]] != 0) break;                    //不为空退出
                }
                else break;

                if (max < tmp) max = tmp;       //判断最大棋型
            }
            return max;
        }

        private void refreshStyle(int x, int y)
        {                                           //下标判断
            if (!(0 <= x && x < Row && 0 <= y && y < Line)) return;

            int[] A;                                //记录坐标

            for (int i = 1; i <= 8; i++)
            {
                for (int j = 1; j <= 5; j++)        //在每个方向上依次取5个坐标与当前坐标比较
                {
                    A = way(x, y, i, j);            //获取方向i第j个坐标
                    if (A[0] != -1)                 //正确获取坐标
                    {
                        if (player[A[0], A[1]] == 0)//&& inRange(A[0], A[1], x, y))//是空位置且邻近
                        {
                            saveStyle(A[0], A[1]);  //更新该空位置的棋型信息
                        }
                    }
                    else break;                     //不在棋盘范围内
                }
            }
        }
        //判断坐标(x,y)周围是否形成五子
        public bool fiveNum(int x, int y)
        {
            int[] Z = new int[8];               //分别记录八个方向上依次相邻的棋子个数
            int[] A;                            //记录坐标

            for (int i = 1; i <= 8; i++)
            {
                for (int j = 1; j <= 4; j++)    //在每个方向上依次取4个棋子与当前棋子比较
                {
                    A = way(x, y, i, j);        //获取方向i第j颗棋子的坐标
                    if (A[0] != -1)             //正确获取坐标
                        if (player[A[0], A[1]] == player[x, y]) Z[i - 1]++;//统计棋子
                        else break;             //与当前坐标的棋子不同
                    else break;                 //超出棋盘范围
                }
                if (Z[i - 1] == 4) return true; //当某个方向上有四个相邻的棋子时
            }

            //当有四个相邻的棋子时，与当前棋子构成五子
            if (Z[0] + Z[4] >= 4 || Z[1] + Z[5] >= 4 || Z[2] + Z[6] >= 4 || Z[3] + Z[7] >= 4)
                return true;
            else return false;
        }

        //清空棋盘中存储的数据
        public void clear()
        {
            for (int i = 0; i < players; i++) count[i] = 0;
            num = 0;                           //计数值清零
            for (int i = 0; i < X.Length; i++) //坐标清零
            {
                X[i] = 0;
                Y[i] = 0;
            }
            for (int i = 0; i < Row; i++)      //清空 棋子和棋型
                for (int j = 0; j < Line; j++)
                {
                    player[i, j] = 0;
                    clearStyle(i, j);
                }
        }
        //清除棋型信息
        private void clearStyle(int x, int y)
        {
            for (int k = 0; k < players; k++)
                style[k, x, y] = 0;
        }
        private int[] way(int x, int y, int w, int num)
        {   //(X,Y)为8个单位方向向量，分别为朝0度、45度、90度、135度 到315度方向变化
            int[] X = { 0, -1, -1, -1, 0, 1, 1, 1 },
                  Y = { 1, 1, 0, -1, -1, -1, 0, 1 },
                  A = { -1, -1 };
            if (w < 1 || w > 8) return A;   //方向需在[1,8]之间, 5到8分别为1到4的反方向
            A[0] = x + X[w - 1] * num;        //计算行坐标
            A[1] = y + Y[w - 1] * num;        //计算列坐标
            if (0 <= A[0] && A[0] < Row && 0 <= A[1] && A[1] < Line) return A;//在棋盘的坐标范围则返回正确坐标
            else { A[0] = -1; return A; }
        }
    }
}