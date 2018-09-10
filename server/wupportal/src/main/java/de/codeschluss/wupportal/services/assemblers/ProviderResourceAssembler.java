package de.codeschluss.wupportal.services.assemblers;

import java.util.List;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;

import de.codeschluss.wupportal.model.Provider;

public class ProviderResourceAssembler implements ResourceAssembler<Provider, Resource<Provider>>{

	@Override
	public Resource<Provider> toResource(Provider provider) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public Resources<Provider> toResource(List<Provider> providers) {
		return null;
	}

}
