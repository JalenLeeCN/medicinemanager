package com.medicine.service;

import com.medicine.model.Manufacturer;
import com.medicine.model.Page;
import com.medicine.model.Provider;
import com.medicine.vo.PageView;

public interface ISupplyDemandService {
	/**
	 * 添加供应商
	 * @param provider
	 * @return
	 */
	public boolean addProvider(Provider provider);
	/**
	 * 添加制造商
	 * @param manufacturer
	 * @return
	 */
	public boolean addManufacturer(Manufacturer manufacturer);
	/**
	 * 查询供应商信息
	 * @param page
	 * @return
	 */
	public PageView providerInfo(Page page);
	/**
	 * 查询供应商总数
	 * @param page
	 * @return
	 */
	public Integer qryProviderCount(Page page);
	/**
	 * 查询制造商信息
	 * @param page
	 * @return
	 */
	public PageView manufacturerInfo(Page page);
	/**
	 * 查询制造商总数
	 * @param page
	 * @return
	 */
	public Integer qryManufacturerCount(Page page);
}
