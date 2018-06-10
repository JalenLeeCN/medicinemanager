package com.medicine.model;

import java.io.Serializable;
import java.util.List;
/**
 * 供应商
 * @author LZZ
 *
 */
public class Provider implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String address;
	private String email;
	private String name;
	private String phoneNum;
	private List<DrugInfo> drugInfos;

	public Provider() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNum() {
		return this.phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public List<DrugInfo> getDrugInfos() {
		return this.drugInfos;
	}

	public void setDrugInfos(List<DrugInfo> drugInfos) {
		this.drugInfos = drugInfos;
	}

	public DrugInfo addDrugInfo(DrugInfo drugInfo) {
		getDrugInfos().add(drugInfo);
		drugInfo.setProvider(this);

		return drugInfo;
	}

	public DrugInfo removeDrugInfo(DrugInfo drugInfo) {
		getDrugInfos().remove(drugInfo);
		drugInfo.setProvider(null);

		return drugInfo;
	}

}