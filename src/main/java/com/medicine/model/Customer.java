package com.medicine.model;

import java.io.Serializable;
import java.util.List;

public class Customer implements Serializable {
	private static final long serialVersionUID = 1L;

	private int id;

	private String name;

	private String quatity;

	private String smallestUnit;

	private List<ExpenseCalender> expenseCalenders;

	public Customer() {
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

	public String getQuatity() {
		return this.quatity;
	}

	public void setQuatity(String quatity) {
		this.quatity = quatity;
	}

	public String getSmallestUnit() {
		return this.smallestUnit;
	}

	public void setSmallestUnit(String smallestUnit) {
		this.smallestUnit = smallestUnit;
	}

	public List<ExpenseCalender> getExpenseCalenders() {
		return this.expenseCalenders;
	}

	public void setExpenseCalenders(List<ExpenseCalender> expenseCalenders) {
		this.expenseCalenders = expenseCalenders;
	}

	public ExpenseCalender addExpenseCalender(ExpenseCalender expenseCalender) {
		getExpenseCalenders().add(expenseCalender);
		expenseCalender.setCustomer(this);

		return expenseCalender;
	}

	public ExpenseCalender removeExpenseCalender(ExpenseCalender expenseCalender) {
		getExpenseCalenders().remove(expenseCalender);
		expenseCalender.setCustomer(null);

		return expenseCalender;
	}

}