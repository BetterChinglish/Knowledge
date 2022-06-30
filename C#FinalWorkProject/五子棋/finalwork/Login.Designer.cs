namespace finalwork
{
    partial class Login
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.nameLabel = new System.Windows.Forms.Label();
            this.pwdLabel = new System.Windows.Forms.Label();
            this.userName = new System.Windows.Forms.TextBox();
            this.userPwd = new System.Windows.Forms.TextBox();
            this.myLogin = new System.Windows.Forms.Button();
            this.myCancel = new System.Windows.Forms.Button();
            this.signUp = new System.Windows.Forms.Label();
            this.upLoad = new System.Windows.Forms.Button();
            this.cancelSignUp = new System.Windows.Forms.Button();
            this.haveSameName = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // nameLabel
            // 
            this.nameLabel.AutoSize = true;
            this.nameLabel.Location = new System.Drawing.Point(258, 114);
            this.nameLabel.Name = "nameLabel";
            this.nameLabel.Size = new System.Drawing.Size(52, 15);
            this.nameLabel.TabIndex = 0;
            this.nameLabel.Text = "用户名";
            this.nameLabel.Click += new System.EventHandler(this.nameLabel_Click);
            // 
            // pwdLabel
            // 
            this.pwdLabel.AutoSize = true;
            this.pwdLabel.Location = new System.Drawing.Point(258, 179);
            this.pwdLabel.Name = "pwdLabel";
            this.pwdLabel.Size = new System.Drawing.Size(45, 15);
            this.pwdLabel.TabIndex = 1;
            this.pwdLabel.Text = "密 码";
            // 
            // userName
            // 
            this.userName.Location = new System.Drawing.Point(367, 111);
            this.userName.Name = "userName";
            this.userName.Size = new System.Drawing.Size(169, 25);
            this.userName.TabIndex = 2;
            this.userName.TextChanged += new System.EventHandler(this.userName_TextChanged);
            // 
            // userPwd
            // 
            this.userPwd.Location = new System.Drawing.Point(367, 173);
            this.userPwd.Name = "userPwd";
            this.userPwd.PasswordChar = '*';
            this.userPwd.Size = new System.Drawing.Size(169, 25);
            this.userPwd.TabIndex = 3;
            this.userPwd.TextChanged += new System.EventHandler(this.userPwd_TextChanged);
            // 
            // myLogin
            // 
            this.myLogin.Location = new System.Drawing.Point(261, 288);
            this.myLogin.Name = "myLogin";
            this.myLogin.Size = new System.Drawing.Size(94, 35);
            this.myLogin.TabIndex = 4;
            this.myLogin.Text = "登录";
            this.myLogin.UseVisualStyleBackColor = true;
            this.myLogin.Click += new System.EventHandler(this.myLogin_Click);
            // 
            // myCancel
            // 
            this.myCancel.Location = new System.Drawing.Point(444, 288);
            this.myCancel.Name = "myCancel";
            this.myCancel.Size = new System.Drawing.Size(92, 35);
            this.myCancel.TabIndex = 5;
            this.myCancel.Text = "取消";
            this.myCancel.UseVisualStyleBackColor = true;
            this.myCancel.Click += new System.EventHandler(this.myCancel_Click);
            // 
            // signUp
            // 
            this.signUp.AutoSize = true;
            this.signUp.Location = new System.Drawing.Point(544, 373);
            this.signUp.Name = "signUp";
            this.signUp.Size = new System.Drawing.Size(151, 15);
            this.signUp.TabIndex = 6;
            this.signUp.Text = "没有账号? 点我注册!";
            this.signUp.Click += new System.EventHandler(this.signUp_Click);
            // 
            // upLoad
            // 
            this.upLoad.Location = new System.Drawing.Point(261, 288);
            this.upLoad.Name = "upLoad";
            this.upLoad.Size = new System.Drawing.Size(94, 35);
            this.upLoad.TabIndex = 7;
            this.upLoad.Text = "注册";
            this.upLoad.UseVisualStyleBackColor = true;
            this.upLoad.Visible = false;
            this.upLoad.Click += new System.EventHandler(this.upLoad_Click);
            // 
            // cancelSignUp
            // 
            this.cancelSignUp.Location = new System.Drawing.Point(444, 288);
            this.cancelSignUp.Name = "cancelSignUp";
            this.cancelSignUp.Size = new System.Drawing.Size(92, 35);
            this.cancelSignUp.TabIndex = 8;
            this.cancelSignUp.Text = "取消";
            this.cancelSignUp.UseVisualStyleBackColor = true;
            this.cancelSignUp.Visible = false;
            this.cancelSignUp.Click += new System.EventHandler(this.cancelSignUp_Click);
            // 
            // haveSameName
            // 
            this.haveSameName.AutoSize = true;
            this.haveSameName.ForeColor = System.Drawing.Color.IndianRed;
            this.haveSameName.Location = new System.Drawing.Point(578, 121);
            this.haveSameName.Name = "haveSameName";
            this.haveSameName.Size = new System.Drawing.Size(0, 15);
            this.haveSameName.TabIndex = 9;
            this.haveSameName.Click += new System.EventHandler(this.label1_Click);
            // 
            // Login
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(785, 462);
            this.ControlBox = false;
            this.Controls.Add(this.haveSameName);
            this.Controls.Add(this.cancelSignUp);
            this.Controls.Add(this.upLoad);
            this.Controls.Add(this.signUp);
            this.Controls.Add(this.myCancel);
            this.Controls.Add(this.myLogin);
            this.Controls.Add(this.userPwd);
            this.Controls.Add(this.userName);
            this.Controls.Add(this.pwdLabel);
            this.Controls.Add(this.nameLabel);
            this.Name = "Login";
            this.Text = "登录";
            this.TopMost = true;
            this.Load += new System.EventHandler(this.Login_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label nameLabel;
        private System.Windows.Forms.Label pwdLabel;
        private System.Windows.Forms.TextBox userName;
        private System.Windows.Forms.TextBox userPwd;
        private System.Windows.Forms.Button myLogin;
        private System.Windows.Forms.Button myCancel;
        private System.Windows.Forms.Label signUp;
        private System.Windows.Forms.Button upLoad;
        private System.Windows.Forms.Button cancelSignUp;
        private System.Windows.Forms.Label haveSameName;
    }
}