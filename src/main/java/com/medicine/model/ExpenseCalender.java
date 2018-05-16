package com.medicine.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
public class ExpenseCalender implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private Date consumptionDate;
	private BigDecimal discountPrice;
	private Customer customer;
	private DrugInfo drugInfo;

	public ExpenseCalender() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getConsumptionDate() {
		return this.consumptionDate;
	}

	public void setConsumptionDate(Date consumptionDate) {
		this.consumptionDate = consumptionDate;
	}

	public BigDecimal getDiscountPrice() {
		return this.discountPrice;
	}

	public void setDiscountPrice(BigDecimal discountPrice) {
		this.discountPrice = discountPrice;
	}

	public Customer getCustomer() {
		return this.customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public DrugInfo getDrugInfo() {
		return this.drugInfo;
	}

	public void setDrugInfo(DrugInfo drugInfo) {
		this.drugInfo = drugInfo;
	}

}