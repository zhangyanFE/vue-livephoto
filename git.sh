#!/bin/bash
# 上面中的 #! 是一种约定标记, 它可以告诉系统这个脚本需要什么样的解释器来执行;

echo "开始提交代码"
echo "git-auto-push start..."
git add .
git commit -m $1
echo "git提交注释======>: $1"

if branch=$(git symbolic-ref --short -q HEAD)
then
  echo '当前提交分支======>: ' $branch
else
  echo not on any branch
fi

git push origin $branch

echo "git-auto-push end..."

# msg = $1;
# if [ -n "$msg"]; then
#    git add -A
#    git commit -m"${msg}"
#    git pull origin dev
#    git status

#    echo "完成add、commit、pull、别忘了push"
# else
#    echo "请添加注释再来一遍！"


# 保存当前目录
# currentDir=$PWD
# echo "Start to publish...\n"

# # 切换到项目目录
# cd /

# git add -A
# git commit -m 'update'

# # 执行git命令
# git pull origin dev
# git push origin dev

# # 切换回原来的目录
# cd $currentDir

# echo "Success\n";


# 打印操作
# function printStep(){
#   echo "### 执行操作【$1】###"
# }

# #判断 字符串参数1是否包含字符串参数2
# function countainStr(){
#   result=$(echo $1 | grep "${2}")
#   if [[ "$result" != "" ]]
#   then
#     return 1
#   else
#     return 0
#   fi
# }
# #ADD
# echo -e "\n"
# printStep "git add"
# echo `git add .`

# printStep "git status"
# echo -e "\n"
# statusResult=`git status`
# echo $statusResult

# # 如果没有文件修改
# countainStr $statusResult "nothing to commit"
# if [ $? == 1 ]
# then
#   echo "当前文件夹没有被【新建】或【修改】"
#   exit
# fi

# # 提交内容为空
# message="$1"
# if [ "$message" = "" ]
# then
#   echo "请输入提交内容"
#   read $message
# fi

# printStep "git commit -A"
# printStep "git commit -m ${message}"
# echo `git commit -m ${message}`

# printStep "git push origin dev"
# pushResult=`git push origin dev`

# # 如果推送远程报错
# countainStr $pushResult "fatal: "
# if [ $? == 1 ]
# then
#   echo "推送远程小伙伴出错了，请联系开发小哥哥看看哪里出错了"
# else
#   echo "提交完成"
# fi