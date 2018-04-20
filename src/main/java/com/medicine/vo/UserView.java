package com.medicine.vo;

import com.medicine.model.User;

public class UserView extends User{
	private Integer menuPerssion;//菜单权限
	private Integer errState;//账密错误位
	
	public Integer getMenuPerssion() {
		return menuPerssion;
	}
	public void setMenuPerssion(Integer menuPerssion) {
		this.menuPerssion = menuPerssion;
	}
	
	public Integer getErrState() {
		return errState;
	}
	public void setErrState(Integer errState) {
		this.errState = errState;
	}
	@Override
	public String toString() {
		return "UserView [menuPerssion=" + menuPerssion + "]";
	}
	
}
