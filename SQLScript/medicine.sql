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
#---------------------------------------------------------------------------- 
# 创建角色表
create table if not exists t_roles(
    `role_id` int not null primary key auto_increment,
	`role_name` varchar(10) not null
);
select * from t_roles;
insert into t_roles(`role_name`) values('管理员');
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
#---------------------------------------------------------------------------- 
# 创建药品信息表
create table if not exists t_druginfo(
   `drug_id` int not null primary key auto_increment,# id pk
	`drug_name` varchar(20) not null, #name 品名
	`drug_manufacturer` varchar(20) not null , #制造商
	`drug_provider` int not null,
	foreign key(`drug_provider`) references t_providers(`prov_id`)
);
insert into t_druginfo(`drug_name`,`drug_manufacturer`,`drug_provider`)
    values('1药品名','1制造商',1);
    
#----------------------------------------------------------------------------    
# 供应商表
create table if not exists t_providers(
  `prov_id` int not null primary key auto_increment, # id pk
  `prov_name` varchar(20) not null # 供应商名称
);
insert into t_providers(`prov_name`) values('供应商1');


#---------------------------------------------------------------------------- 
# 药品说明书表
create table if not exists t_drug_specification(
    `drug_id` int not null, # fk t_druginfo drug_id
    `drug_ingredient` varchar(20), # 组成成分   
    foreign key(`drug_id`) references t_druginfo(`drug_id`)
);

#---------------------------------------------------------------------------- 
# 药品主要成分表
create table if not exists t_drug_main_ingredient(
    `drug_id` int not null,
    `drug_ingredient` varchar(10)
    foreign key(`drug_id`) references t_druginfo(`drug_id`)
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