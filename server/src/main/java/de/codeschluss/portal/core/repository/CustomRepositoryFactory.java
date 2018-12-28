package de.codeschluss.portal.core.repository;

import java.io.Serializable;

import javax.persistence.EntityManager;

import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.data.repository.core.RepositoryMetadata;
import org.springframework.data.repository.core.support.RepositoryComposition.RepositoryFragments;
import org.springframework.data.repository.core.support.RepositoryFragment;

/**
 * The Class CustomRepositoryFactory.
 * 
 * @author Valmir Etemi
 *
 */
public class CustomRepositoryFactory extends JpaRepositoryFactory {
  
  private final EntityManager entityManager;

  public CustomRepositoryFactory(EntityManager entityManager) {
    super(entityManager);
    this.entityManager = entityManager;
  }
 
  @Override
  protected RepositoryFragments getRepositoryFragments(RepositoryMetadata metadata) {
    RepositoryFragments fragments = super.getRepositoryFragments(metadata);

    if (QueryableReadRepository.class.isAssignableFrom(
        metadata.getRepositoryInterface())) {

      JpaEntityInformation<?, Serializable> entityInformation = 
          getEntityInformation(metadata.getDomainType());

      Object queryableFragment = getTargetRepositoryViaReflection(
          QueryableReadRepositoryImpl.class, entityInformation, entityManager);

      fragments = fragments.append(RepositoryFragment.implemented(queryableFragment));
    }

    return fragments;
  }

}
