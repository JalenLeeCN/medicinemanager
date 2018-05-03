# 创建数据库
create database if not exists medicine;
show databases;
use medicine;
# 显示当前数据库
select database();
# 显示当前用户
select user();
show tables;
create table if not exists testConn (
  `id` int(2),
  `name` varchar(10)
);
# MySql运行在safe-updates模式下，该模式会导致非主键条件下无法执行update或者delete命令
SET SQL_SAFE_UPDATES = 0;
select * from testConn;
insert into testConn values(0,'a');
delete from testConn where `name`='a';
insert into testConn values(1,'b');
insert into testConn values(2,'c');
insert into testConn values(3,'c');
update testConn a set a.name='d' where id=3;
commit;

#---------------------------------------------------------------------------- 
# 创建用户表t_users
create table if not exists t_users(
    `user_id` int not null primary key auto_increment,
	`user_name` varchar(20) not null,
	`user_password` varchar(20) default null
);
select * from t_users;
insert into t_users(`user_name`,`user_password`,`user_email`) values('aa','aa','1377308649@qq.com');

# 增加验证码列
alter table t_users add column `user_verification` varchar(20);
# 增加邮箱列
alter table t_users add column `user_email` varchar(50);
# 修改邮箱列非空
alter table t_users modify `user_email` varchar(50) not null;
# id,用户名唯一
alter table t_users add unique(`user_name`);
alter table t_users add unique(`user_id`);
#---------------------------------------------------------------------------- 
# 创建角色表
create table if not exists t_roles(
    `role_id` int not null primary key auto_increment,
	`role_name` varchar(10) not null
);
select * from t_roles;
insert into t_roles(`role_name`) values('超级管理员');
insert into t_roles(`role_name`) values('角色管理员');
insert into t_roles(`role_name`) values('药品录入员');
insert into t_roles(`role_name`) values('药品管理员');
insert into t_roles(`role_name`) values('人员管理员');
#---------------------------------------------------------------------------- 
# 创建用户角色表
create table if not exists t_user_role(
   `role_id` int not null,
	`user_id` int not null,
	foreign key(`user_id`) references t_users(`user_id`),
	foreign key(`role_id`) references t_roles(`role_id`)
);
commit;


select * from t_user_role;
insert into t_user_role values(1,1);
insert into t_user_role values(2,2);
insert into t_user_role values(3,3);
insert into t_user_role values(4,4);
insert into t_user_role values(5,5);
#---------------------------------------------------------------------------- 
# 创建药品信息表
create table if not exists t_druginfo(
   `drug_id` int not null primary key auto_increment,# id pk
	`dm_id` int not null , #制造商
	`drug_provider` int not null, #供应商
	`drug_specification` 
);
insert into t_druginfo(`drug_name`,`drug_manufacturer`,`drug_provider`)
    values('1药品名','1制造商',1);
    
#----------------------------------------------------------------------------    
# 第三方信息表
create table if not exists t_thirdpartyinfo(
  `thirdparty_id` int not null primary key auto_increment, # id pk
  `thirdparty_name` varchar(20) not null # 供应商名称
  
);
insert into t_providers(`prov_name`) values('供应商1');


#---------------------------------------------------------------------------- 
# 药品说明书表
drop table t_drug_specification;
create table if not exists t_drug_specification(
    `ds_id` int not null primary key auto_increment, # pk
    `drug_id` int not null,# fk t_druginfo drug_id
    `ds_
    foreign key(`drug_id`) references t_druginfo(`drug_id`)
);

#---------------------------------------------------------------------------- 
# 药品成分表
create table if not exists t_drug_ingredient(
    `di_id` int not null primary key auto_increment, # pk
    `ds_id` int not null,# fk t_drug_specification `ds_id`
    `di_ingredient` varchar(20)
);

#-----------------------------------------------------------------------------
SELECT
		user_id AS id,
		user_name AS name,
		user_password AS PASSWORD,
		user_verification AS verification
FROM t_users u
WHERE 
		u.user_name = 'aa' and
		(u.user_password = '' or u.user_verification is null)