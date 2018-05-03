select r.role_name,group_concat(ur.user_id) from t_roles r 
	join t_user_role ur on r.role_id = ur.role_id group by role_name;
SELECT r.role_name, COUNT(ur.user_id)
FROM t_roles r
JOIN t_user_role ur ON r.role_id = ur.role_id
GROUP BY role_name;
