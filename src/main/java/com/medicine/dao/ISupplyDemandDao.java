package com.medicine.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.medicine.model.Manufacturer;
import com.medicine.model.Page;
import com.medicine.model.Provider;

@Repository("supplydemandDao")
public interface ISupplyDemandDao {
	
	public void addProvider(Provider provider);

	public void addManufacturer(Manufacturer manufacturer);

	public List<Provider> providerInfo(Page page);

	public Integer qryProviderCount(Page page);
	
	public List<Manufacturer> manufacturerInfo(Page page);
	
	public Integer qryManufacturerCount(Page page);
}
