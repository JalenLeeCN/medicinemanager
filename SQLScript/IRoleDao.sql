select r.role_id,r.role_name from t_roles r limit 0,2;
SELECT COUNT(role_id)
FROM t_roles
insert into t_roles(role_name) values('一般用户');
update t_roles set role_name ='游客' where role_id = '6'