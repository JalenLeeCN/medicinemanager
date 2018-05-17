package com.medicine.model;

import java.io.Serializable;

public class UserRole implements Serializable {
	private static final long serialVersionUID = 1L;

	private int id;
	private int rolesId;
	private int usersId;

	public UserRole() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRolesId() {
		return this.rolesId;
	}

	public void setRolesId(int rolesId) {
		this.rolesId = rolesId;
	}

	public int getUsersId() {
		return this.usersId;
	}

	public void setUsersId(int usersId) {
		this.usersId = usersId;
	}

}