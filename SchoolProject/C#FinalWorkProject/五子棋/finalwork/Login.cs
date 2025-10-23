using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data.MySqlClient;



namespace finalwork
{
    public partial class Login : Form
    {
        private int[] whetherLogin;
        private MySqlConnection connect;

        public Login(int[] whetherLogin)
        {
            InitializeComponent();
            this.whetherLogin = whetherLogin;
            

    }

        public static string server = "rm-bp10l6tput5rz9y0tjo.mysql.rds.aliyuncs.com";
        public static string port = "3306";
        public static string user = "teacher_hx";
        public static string password = "Hx123456!";
        public static string database = "csharp";
        public static string connectString = "server=" + server + ";port=" + port + ";user=" + user + ";password=" + password + ";database=" + database + ";";

        private MySqlConnection createConnection()
        {
            MySqlConnection conn = new MySqlConnection(connectString);
            try
            {
                conn.Open();
                return conn;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        private void userName_TextChanged(object sender, EventArgs e)
        {
            /*if(connect.State == ConnectionState.Closed)
            {
                connect.Open(); 
            }

            bool haveSameUserName = false;

            string sqlString = "select * from user";
            MySqlCommand cmd = new MySqlCommand(sqlString, connect);
            MySqlDataReader reader = cmd.ExecuteReader();
            while (true)
            {
                if (reader.Read())
                {
                    if (reader[0].ToString() == userName.Text.Trim())
                    {
                        haveSameUserName = true;
                    }
                    else
                    {
                        continue;
                    }
                }
                else
                {
                    break;

                }

            }
            if (haveSameUserName)
            {
                upLoad.Enabled = false;
                myLogin.Enabled = true;
                haveSameName.Text = "haveSameUserNameInDataBase";
            }*/
        }

        private void myLogin_Click(object sender, EventArgs e)
        {
            if(userName.Text != "" && userPwd.Text != "")
            {
                if(connect.State == ConnectionState.Closed)
                {
                    connect.Open();
                }
                string sqlStr = "select * from user";
                MySqlCommand cmd = new MySqlCommand(sqlStr, connect);
                MySqlDataReader reader = cmd.ExecuteReader();
                while (true)
                {
                    if (reader.Read())
                    {
                        if (reader[0].ToString() == userName.Text.Trim())
                        {
                            if(reader[1].ToString()== userPwd.Text.Trim())
                            {
                                MessageBox.Show("登陆成功");
                                connect.Close();
                                this.whetherLogin[0] = 1;
                                this.whetherLogin[1] = 1;
                                this.Close();
                                this.Dispose();
                                break;
                            }
                        }
                        else
                        {
                            continue;
                        }

                    }
                    else
                    {
                        MessageBox.Show("账号或密码有误, 请重新输入!");
                        connect.Close();
                        break;
                    }
                }

                
            }
            else
            {
                MessageBox.Show("请输入账号密码!!!");
            }
        }

        private void Login_Load(object sender, EventArgs e)
        {
            connect = this.createConnection();
            MessageBox.Show("连接云数据库:" + server + "\n端口: " + port + "\n使用账户名: " + user + "\n访问的database: " + database+"\n权限: Read and Write(DDL&DML)\n警告: 此服务器仅在2022/6/18前为所有ip开放");
            
        }

        private void myCancel_Click(object sender, EventArgs e)
        {
            DialogResult result = MessageBox.Show("如果不登录则无法进行游戏, 是否取消登录?","取消登录", MessageBoxButtons.YesNo);
            if(result == DialogResult.Yes)
            {
                connect.Close();
                this.Close();
                this.Dispose();
            }
        }

        private void signUp_Click(object sender, EventArgs e)
        {
            userName.Text = "";
            userPwd.Text = "";
            this.Text = "注册";
            myLogin.Hide();
            myCancel.Hide();
            upLoad.Show();
            cancelSignUp.Show();
            signUp.Hide();

        }

        private void nameLabel_Click(object sender, EventArgs e)
        {

        }

        private void upLoad_Click(object sender, EventArgs e)
        {
            if (userName.Text.Trim() != "" && userPwd.Text.Trim() != "")
            {
                try
                {
                    DialogResult result = MessageBox.Show("确定注册新用户\n    用户名: " + userName.Text.Trim() + "\n    密码: " + userPwd.Text.Trim(), "注册", MessageBoxButtons.YesNo);
                    if (result == DialogResult.Yes)
                    {
                        // 如果连接关闭则打开
                        if (connect.State == ConnectionState.Closed)
                        {
                            connect.Open();
                        }
                        // 判断是否存在该用户名
                        bool haveSameUser = false;
                        string sqlString = "select * from user";
                        MySqlCommand cmd = new MySqlCommand(sqlString, connect);
                        MySqlDataReader reader = cmd.ExecuteReader();
                        while (true)
                        {
                            if (reader.Read())
                            {
                                if (reader[0].ToString() == userName.Text.Trim())
                                {
                                    haveSameUser = true;
                                }
                            }
                            else
                            {
                                break;

                            }

                        }
                        reader.Close();
                        cmd.Dispose();

                        // 如果没有出现重复的用户名则插入
                        if (haveSameUser == false)
                        {
                            // 判断是否过长, 过长则提示并退出
                            if (userName.Text.Trim().Length > 10 || userPwd.Text.Trim().Length > 16)
                            {
                                MessageBox.Show("用户名或密码过长!\n    用户名长度不超过10\n    密码长度不超过16");
                                return;
                            }


                            // 插入语句
                            string sqlStr = "insert into user (userName, pwd) values (\"" + userName.Text.Trim() + "\", \"" + userPwd.Text.Trim() + "\")";
                            cmd = new MySqlCommand(sqlStr, connect);

                            if (cmd.ExecuteNonQuery() > 0)
                            {
                                MessageBox.Show("添加成功!");
                                cmd.Dispose();

                                // 跳转回登录页面
                                this.Text = "登录";
                                upLoad.Hide();
                                cancelSignUp.Hide();
                                myLogin.Show();
                                myCancel.Show();
                                signUp.Show();
                            }
                            else
                            {
                                MessageBox.Show("添加失败, 请联系云服务器管理员\n    qq: 2199840669\n    phone: 17779144780");
                            }
                        }
                        // 否则提醒错误
                        else
                        {
                            MessageBox.Show("已有该用户, 请修改用户名后重试!");
                            userName.Text = "";
                            return;
                        }

                    }
                }
                finally
                {
                    connect.Close();
                }
                

            }
            else
            {
                MessageBox.Show("用户名和密码不能为空!");

            }

        }
       

        private void cancelSignUp_Click(object sender, EventArgs e)
        {
            userName.Text = "";
            userPwd.Text = "";
            this.Text = "登录";
            upLoad.Hide();
            cancelSignUp.Hide();
            myLogin.Show();
            myCancel.Show();
            signUp.Show();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void userPwd_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
