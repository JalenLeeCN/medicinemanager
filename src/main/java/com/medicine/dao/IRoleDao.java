package com.medicine.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.medicine.model.Role;

@Repository("roleDao")
public interface IRoleDao {
	public List<Role> queryRole();
}
