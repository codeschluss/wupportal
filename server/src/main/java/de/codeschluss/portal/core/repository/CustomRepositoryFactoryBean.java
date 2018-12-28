package de.codeschluss.portal.core.repository;

import javax.persistence.EntityManager;

import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

/**
 * The Class CustomRepositoryFactoryBean.
 * 
 * @author Valmir Etemi
 *
 */
public class CustomRepositoryFactoryBean<T extends Repository<S, I>, S, I>
    extends JpaRepositoryFactoryBean<T, S, I> {

  public CustomRepositoryFactoryBean(Class<? extends T> repositoryInterface) {
    super(repositoryInterface);
  }

  protected RepositoryFactorySupport createRepositoryFactory(EntityManager entityManager) {
    return new CustomRepositoryFactory(entityManager);
  }

}
