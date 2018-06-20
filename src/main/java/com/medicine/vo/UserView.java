package com.medicine.vo;

import com.medicine.model.User;

public class UserView extends User{
	private Integer menuPerssion;//菜单权限
	/** 0:failed 1:success */
	private Integer loginstate;//登录成功与否
	
	private String roleName;
	
	public Integer getLoginstate() {
		return loginstate;
	}
	public void setLoginstate(Integer loginstate) {
		this.loginstate = loginstate;
	}
	public Integer getMenuPerssion() {
		return menuPerssion;
	}
	public void setMenuPerssion(Integer menuPerssion) {
		this.menuPerssion = menuPerssion;
	}
	
	@Override
	public String toString() {
		return "UserView [menuPerssion=" + menuPerssion + "]";
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}
