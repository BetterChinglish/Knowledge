using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace finalwork
{
    public partial class Form1 : Form
    {
        Pen pen1 = null;
        private Player player;
        public Image[] image = { finalwork.Properties.Resources.标记, null, null, };
        public int N = 18, M = 18;                          //规定绘制的棋盘的行和列
        public int dis = 30, radius = 8;                    //规定棋格的长度和棋子的长度
        public int border = 15;                             //棋盘和窗体的边距长度
        private Board qipan;
        public Graphics g;
        public Graphics gs;
        private string[] str = { "", "" };
        private bool[] auto;                                
        private bool[] quit;                                //标记各个玩家是否已经退出
        private int[] win;                                  //标记依次获胜的各个玩家
        private Class1 lastX = new Class1();
        private Class1 lastY = new Class1();
        private int firstplayer = 1;
        private int secondplayer = 1;
        private bool[,] flag = new bool[20, 20];//残局棋子生成

        public int Flag = 0;

        // 第一个为是否登录成功控制, 0表示未登录, 1表示登录
        public int[] whetherLogin = {0, 0};

        public Form1()
        {
            toLogin();
            InitializeComponent();
        }
        private void toLogin()
        {
            if (whetherLogin[0] == 0)
            {
                this.Hide();
                Login loginForm = new Login(whetherLogin);
                loginForm.ShowDialog();
            }
            if (whetherLogin[1] == 0)
            {
                MessageBox.Show("由于您没有登录, 游戏将关闭!");
                this.Close();
                Environment.Exit(0);
            }
        }
        private void button1_Click(object sender, EventArgs e)
        {

        }
        private void Form1_Load(object sender, EventArgs e)
        {

            player = new Player(2);                        //初始化num个玩家
            qipan = new Board(M, N, 2);
            pen1 = new Pen(Color.Black, 2);
            pen1.Width = 1;
            g = pictureBox1.CreateGraphics();               //在对象图片框中创建一个Graphics对象用于绘图
            lastX.OnMyValueChanged += myclase1_OnMyValueChanged;
            lastY.OnMyValueChanged += myclase2_OnMyValueChanged;
            lastX.MyValue = -1;
            lastY.MyValue = -1;
            label3.Visible = false;
            label5.Visible = false;
            label4.Visible = false;
            label6.Visible = false;
            label7.Visible = false;

        }
        private void pictureBox1_Paint(object sender, PaintEventArgs e)
        {
            pictureBox1.Width = (N - 1) * dis + 2 * border; //根据行列数设置棋盘大小
            pictureBox1.Height = (M - 1) * dis + 2 * border;
            g = e.Graphics;
            g.Clear(Color.White);
            drawQiPan(g);
            g = pictureBox1.CreateGraphics();
            pictureBox1.Left = 0;
            pictureBox1.Top = 0;
            Height = Height - ClientSize.Height + pictureBox1.Height;
        }
        private void drawQiPan(Graphics g)
        {
            g.DrawRectangle(pen1, border, border, pictureBox1.Width - 2 * border, pictureBox1.Height - 2 * border);
            for (int i = border; i < (N - 1) * dis + border; i += dis)
            {
                g.DrawLine(pen1, i, border, i, (N - 1) * dis + border);
            }
            for (int i = border; i < (M - 1) * dis + border; i += dis)
            {
                g.DrawLine(pen1, border, i, (N - 1) * dis + border, i);
            }
        }
        private void pictureBox1_MouseClick(object sender, MouseEventArgs e)
        {
            if (Flag == 0)
            {
                if (comboBox1.SelectedItem == null)
                {
                    MessageBox.Show("请先选择先手方颜色");
                }
                else
                {
                    switch (comboBox1.SelectedItem)
                    {
                        case "黑色":
                            image[1] = finalwork.Properties.Resources.黑棋;
                            str[0] = "黑方";
                            break;
                        case "白色":
                            image[1] = finalwork.Properties.Resources.白棋;
                            str[0] = "白方";
                            break;
                    }
                }
                if (comboBox2.SelectedItem == null)
                {
                    MessageBox.Show("请先选择后手方颜色");
                }
                else
                {
                    switch (comboBox2.SelectedItem)
                    {
                        case "黑色":
                            image[2] = finalwork.Properties.Resources.黑棋;
                            str[1] = "黑方";
                            break;
                        case "白色":
                            image[2] = finalwork.Properties.Resources.白棋;
                            str[1] = "白方";
                            break;

                    }
                }
                if (comboBox2.SelectedItem == comboBox1.SelectedItem && comboBox1.SelectedItem != null)
                {
                    comboBox2.SelectedItem = null;
                    MessageBox.Show("颜色重复！");
                    return;
                }
                if (comboBox1.SelectedItem == null || comboBox2.SelectedItem == null)
                {
                    return;
                }
            }
            Flag = 1;
            int X, Y;//用鼠标单击事件获取落子的坐标
            X = (int)((e.Y - border + dis / 2) / dis);      //计算在棋盘中的行坐标
            Y = (int)((e.X - border + dis / 2) / dis);      //列坐标
            putChess(X, Y);
            label4.Visible = true;
            label5.Visible = true;
            label3.Visible = true;
            label6.Visible = true;
            label7.Visible = true;
            int a1 = lastX.MyValue + 1;
            int a2 = lastY.MyValue + 1;
            label3.Text = str[player.getNext(2) - 1];
            label5.Text = a1 + "行" + a2 + "列";
            label7.Text = str[player.getNext(1) - 1];
        }
        private void myclase1_OnMyValueChanged(object sender, EventArgs e)
        {
            Console.WriteLine(lastX.MyValue);
        }
        private void myclase2_OnMyValueChanged(object sender, EventArgs e)
        {
            Console.WriteLine(lastY.MyValue);
        }
        private void putChess(int x, int y)                 //玩家在棋盘上坐标(x,y)处落下棋子
        {
            lastX.MyValue = x;
            lastY.MyValue = y;
            label2.Text = "游戏开始";
            int preplayer;
            if (0 <= x && x < M && 0 <= y && y < N)         //下棋子的位置在棋盘之内时，在棋盘上绘制棋子
            {
                //测试区
                if (qipan.player[x, y] == 0)                 //如果该处无棋子
                {
                    qipan.put(x, y, player.getNext(1));       //下一个玩家落下棋子,在棋盘中记录该信息
                    drawpic(qipan.player[x, y], x, y);      //绘制该玩家对应的棋子
                    //drawpic(1, x, y);
                    drawpic(0, x, y);                       //在棋子上绘制标记
                    if (qipan.num > 1)                      //重新绘制下的前一颗棋子，去除标记
                    {
                        preplayer = qipan.player[qipan.X[qipan.num - 2], qipan.Y[qipan.num - 2]];
                        //drawpic(2, x, y);
                        drawpic(preplayer, qipan.X[qipan.num - 2], qipan.Y[qipan.num - 2]);
                    }

                    if (qipan.fiveNum(x, y))                //当其中一方获胜时
                    {

                        int playerN = qipan.player[x, y];
                        MessageBox.Show(str[playerN - 1] + "胜出");
                        if (DialogResult.Yes == MessageBox.Show("是否保存胜利截图？", "信息",
                            MessageBoxButtons.YesNo))
                        {
                            PrtScreen();
                        }
                        if (DialogResult.Yes ==
                            MessageBox.Show("再来一盘？", "信息", MessageBoxButtons.YesNo))
                        {
                            label2.Text = "游戏尚未开始";
                            again();//再来一盘
                        }
                        else
                        {
                            Application.Exit();
                        }


                    }
                    pass();                                 //下一位玩家下棋
                }
                else
                {
                    MessageBox.Show("已有棋子");
                }
            }
        }

        private void PrtScreen()
        {
            Screen scr = Screen.PrimaryScreen;
            Rectangle rc = scr.Bounds;
            int iWidth = rc.Width;
            int iHeight = rc.Height;
            //创建一个和屏幕一样大的Bitmap
            Image myImage = new Bitmap(iWidth, iHeight);
            //从一个继承自Image类的对象中创建Graphics对象
            gs = Graphics.FromImage(myImage);
            //抓屏并拷贝到myimage里
            gs.CopyFromScreen(new Point(0, 0), new Point(0, 0), new Size(iWidth, iHeight));
            //保存为文件
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            dialog.Description = "请选择文件路径";
            string foldPath = "";
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                foldPath = dialog.SelectedPath + @"/1.jpg";
            }
            myImage.Save(foldPath);
        }


        private void pass()                                 //让一子 或 交出下子权给下一位玩家
        {
            if (player != null)
            {
                player.next(1);                                 //下一位玩家//Tip();                                          //提示落子
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            player.getfirst(2);
            label2.Text = "游戏尚未开始";
            qipan.clear();
            pictureBox1.Width = (N - 1) * dis + 2 * border; //根据行列数设置棋盘大小
            pictureBox1.Height = (M - 1) * dis + 2 * border;
            g.Clear(Color.White);
            drawQiPan(g);
            g = pictureBox1.CreateGraphics();
            pictureBox1.Left = 0;
            pictureBox1.Top = 0;
            Height = Height - ClientSize.Height + pictureBox1.Height;
            //pass();
        }


        private void button1_Click_1(object sender, EventArgs e)//悔棋
        {
            if (str[player.getNext(2) - 1].Equals(str[0]))
            {
                if (firstplayer == 0)
                {
                    MessageBox.Show("无可用次数");
                    return;
                }
                else
                {
                    firstplayer--;
                    label13.Text = firstplayer + "";
                }
            }
            if (str[player.getNext(2) - 1].Equals(str[1]))
            {
                if (secondplayer == 0)
                {
                    MessageBox.Show("无可用次数");
                    return;
                }
                else
                {
                    secondplayer--;
                    label12.Text = secondplayer + "";
                }
            }
            int preX, preY, prePlayer;
            for (int i = 0; i < 2; i++)
                if (qipan.num > 0)
                {
                    preX = qipan.X[qipan.num - 1];                //获取最后一颗棋子的横坐标
                    preY = qipan.Y[qipan.num - 1];                //纵坐标
                    prePlayer = qipan.player[preX, preY];         //该棋子的所有者
                    int a1 = preX;
                    int a2 = preY;
                    //int playerN = qipan.player[X, Y];
                    label3.Text = str[player.getNext(1) - 1];
                    label5.Text = a1 + "行" + a2 + "列";
                    label7.Text = str[player.getNext(2) - 1];

                    if (qipan.fiveNum(preX, preY))
                    {
                        win[0]--;
                        quit[prePlayer - 1] = false;
                    }
                    Eraser(preX, preY, prePlayer);                //用背景图像擦除最后一颗棋子
                    qipan.retreat();                              //棋盘后退一步
                    player.pre(1);                                //退回前一位玩家
                    if (qipan.num > 0) drawpic(0, qipan.X[qipan.num - 1], qipan.Y[qipan.num - 1]);//在前一颗棋子上绘制标记
                }
        }


        private void Eraser(int x, int y, int player)         //使用背景图像重新绘制棋盘的指定区域，实现棋盘上棋子的擦除
        {
            Image image1 = pictureBox1.BackgroundImage, image2 = image[player];
            GraphicsUnit units = GraphicsUnit.Pixel;          //图像单元
            int X = y * dis + border - dis / 2,               //计算像素横坐标
                Y = x * dis + border - dis / 2;               //纵坐标
            Rectangle desRect = new Rectangle(X, Y, (int)(image2.Width), (int)(image2.Height)); //棋盘中要擦除的位置，s为放大倍数
            Rectangle srcRect = new Rectangle((int)(X), (int)(Y), (int)(desRect.Width), (int)(desRect.Height));//计算在背景图像中的对应区域
            g.DrawImage(image1, desRect, srcRect, units);     //用背景图像重画区域rect1
            drawQipanLine(x, y);                              //重绘棋盘坐标(x, y)处周边的棋盘线
        }

        private void drawQipanLine(int x, int y)            //重绘棋盘坐标(x, y)处周边的棋盘线
        {
            int wid1 = 1, wid2 = 1;                              //分别标记水平线、垂直线的宽度

            int X = border + dis * y,                       //计算水平像素
                Y = border + dis * x;                       //垂直像素位置

            if (x == 0 || x == M - 1) wid1 = 2;             //棋盘线宽度控制
            if (y == 0 || y == N - 1) wid2 = 2;

            int x1, x2, y1, y2;                             //棋盘线范围控制
            y1 = (x == 0) ? Y : Y - dis / 2;                //0行处,垂直方向y1不可超过边界
            y2 = (x == M - 1) ? Y : Y + dis / 2;            //最后一行
            x1 = (y == 0) ? X : X - dis / 2;                //第一列
            x2 = (y == N - 1) ? X : X + dis / 2;            //最后一列

            pen1.Width = wid1;
            g.DrawLine(pen1, x1, Y, x2, Y);                 //水平棋盘线

            pen1.Width = wid2;
            g.DrawLine(pen1, X, y1, X, y2);                 //竖直棋盘线
        }

        private void label4_Click(object sender, EventArgs e)
        {

        }

      


        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void drawpic(int pic, int x, int y)         //在棋盘上坐标(x,y)处绘制下标为pic的image图像
        {
            int X = y * dis + border - dis / 2,             //计算在棋盘上的像素横坐标
                Y = x * dis + border - dis / 2;             //纵坐标
            g.DrawImage(image[pic], X, Y,
                (int)(image[pic].Width), (int)(image[pic].Height));
        }
        private void again()
        {
            player.getfirst(2);
            qipan.clear();                      //清空棋盘上的棋子
            pictureBox1.Width = (N - 1) * dis + 2 * border; //根据行列数设置棋盘大小
            pictureBox1.Height = (M - 1) * dis + 2 * border;
            g.Clear(Color.White);
            drawQiPan(g);
            g = pictureBox1.CreateGraphics();
            pictureBox1.Left = 0;
            pictureBox1.Top = 0;
            Height = Height - ClientSize.Height + pictureBox1.Height;
            pass();
        }
    }
}