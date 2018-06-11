select * from drug_info d ;


insert into drug_info 
	(`name`,`store_flag`,`unit_price`,`manufacturer_id`,`providers_id`,`quantity`,`smalllest_unit`,`scale`)
 values
	('dianfu',0,1,1,1,'数量','最小单位',10);


select
			d.name, p.name as providersName, m.name as manufacturerName
		from
			drug_info d
		left join
			providers p ON d.providers_id = p.id
		left join
			manufacturer m ON d.manufacturer_id = m.id
		where
			d.store_flag = 1
			and d.name like '感冒';