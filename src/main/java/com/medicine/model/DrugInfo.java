package com.medicine.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

public class DrugInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	private int id;
	private String name;
	private String quantity;
	private String smalllestUnit;
	private String storeFlag;
	private BigDecimal unitPrice;
	private Manufacturer manufacturer;
	private Provider provider;
	private List<ExpenseCalender> expenseCalenders;
	private List<PackageInsert> packageInserts;

	public DrugInfo() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getQuantity() {
		return this.quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getSmalllestUnit() {
		return this.smalllestUnit;
	}

	public void setSmalllestUnit(String smalllestUnit) {
		this.smalllestUnit = smalllestUnit;
	}

	public String getStoreFlag() {
		return this.storeFlag;
	}

	public void setStoreFlag(String storeFlag) {
		this.storeFlag = storeFlag;
	}

	public BigDecimal getUnitPrice() {
		return this.unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Manufacturer getManufacturer() {
		return this.manufacturer;
	}

	public void setManufacturer(Manufacturer manufacturer) {
		this.manufacturer = manufacturer;
	}

	public Provider getProvider() {
		return this.provider;
	}

	public void setProvider(Provider provider) {
		this.provider = provider;
	}

	public List<ExpenseCalender> getExpenseCalenders() {
		return this.expenseCalenders;
	}

	public void setExpenseCalenders(List<ExpenseCalender> expenseCalenders) {
		this.expenseCalenders = expenseCalenders;
	}

	public ExpenseCalender addExpenseCalender(ExpenseCalender expenseCalender) {
		getExpenseCalenders().add(expenseCalender);
		expenseCalender.setDrugInfo(this);

		return expenseCalender;
	}

	public ExpenseCalender removeExpenseCalender(ExpenseCalender expenseCalender) {
		getExpenseCalenders().remove(expenseCalender);
		expenseCalender.setDrugInfo(null);

		return expenseCalender;
	}

	public List<PackageInsert> getPackageInserts() {
		return this.packageInserts;
	}

	public void setPackageInserts(List<PackageInsert> packageInserts) {
		this.packageInserts = packageInserts;
	}

	public PackageInsert addPackageInsert(PackageInsert packageInsert) {
		getPackageInserts().add(packageInsert);
		packageInsert.setDrugInfo(this);

		return packageInsert;
	}

	public PackageInsert removePackageInsert(PackageInsert packageInsert) {
		getPackageInserts().remove(packageInsert);
		packageInsert.setDrugInfo(null);

		return packageInsert;
	}

}