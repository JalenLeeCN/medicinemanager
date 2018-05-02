package com.medicine.model;
/**
 * 用户model
 * @author Administrator
 *
 */
public class User {
	private Integer id;//id pk
	private String name;//用户名
	private String password;//密码
	private String verification;//验证码
	private String email;//邮箱
	
	
	public User() {
	}
	public User(String name, String password) {
		super();
		this.name = name;
		this.password = password;
	}
	public String getVerification() {
		return verification;
	}
	public void setVerification(String verification) {
		this.verification = verification;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
}
