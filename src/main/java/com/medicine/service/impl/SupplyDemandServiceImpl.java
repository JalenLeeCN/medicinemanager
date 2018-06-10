package com.medicine.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.medicine.dao.ISupplyDemandDao;
import com.medicine.model.Manufacturer;
import com.medicine.model.Page;
import com.medicine.model.Provider;
import com.medicine.service.ISupplyDemandService;
import com.medicine.util.PagingUtil;
import com.medicine.vo.PageView;

@Service("supplydemandService")
public class SupplyDemandServiceImpl implements ISupplyDemandService {
	@Resource(name = "supplydemandDao")
	private ISupplyDemandDao supplydemandDao;
	@Resource(name="pagingUtil")
	private PagingUtil pagingUtil;

	@Override
	public boolean addProvider(Provider provider) {
		boolean flag = false;
		try {
			this.supplydemandDao.addProvider(provider);
			flag = true;
		} catch (Exception e) {
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean addManufacturer(Manufacturer manufacturer) {
		boolean flag = false;
		try {
			this.supplydemandDao.addManufacturer(manufacturer);
			flag = true;
		} catch (Exception e) {
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}
	
	@Override
	public PageView providerInfo(Page page) {
		page.setPageSize(pagingUtil.getPageSize());
		List<Provider> providers = this.supplydemandDao.providerInfo(page);
		PageView pv = this.pagingUtil.pageBuilder(page, qryProviderCount(page), providers);
		return pv;
	}
	
	@Override
	public Integer qryProviderCount(Page page) {
		return this.supplydemandDao.qryProviderCount(page);
	}
	
	@Override
	public PageView manufacturerInfo(Page page) {
		page.setPageSize(pagingUtil.getPageSize());
		List<Manufacturer> providers = this.supplydemandDao.manufacturerInfo(page);
		PageView pv = this.pagingUtil.pageBuilder(page, qryManufacturerCount(page), providers);
		return pv;
	}
	
	@Override
	public Integer qryManufacturerCount(Page page) {
		return this.supplydemandDao.qryManufacturerCount(page);
	}

}
