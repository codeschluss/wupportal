package de.codeschluss.portal.organisation;

import org.springframework.hateoas.core.Relation;

import de.codeschluss.portal.provider.ProviderEntity;
import lombok.Data;

@Data
@Relation(collectionRelation = "data")
public class OrganisationUserTO {
	
	private String id;
	
	private String description;

	private byte[] image;

	private String mail;

	private String name;

	private String phone;

	private String website;
	
	private String userId;
	
	private boolean admin;
	
	private boolean approved;	
	
	public OrganisationUserTO(OrganisationEntity orga, ProviderEntity provider) {
		id = orga.getId();
		description = orga.getDescription();
		image = orga.getImage();
		mail = orga.getMail();
		name = orga.getName();
		phone = orga.getPhone();
		website = orga.getWebsite();
		userId = provider.getUser().getId();
		admin = provider.isAdmin();
		approved = provider.isApproved();
	}

	
}
