package de.codeschluss.portal.core.service;

import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Repository Service to retrieve repositories based on given entity types.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class RepositoryService {

  @Autowired
  private ListableBeanFactory listableBeanFactory;

  Repositories repositories = null;
  
  @EventListener
  public void handleContextRefresh(ContextRefreshedEvent event) {
    repositories = new Repositories(listableBeanFactory);
  }

  public <E extends BaseEntity> DataRepository<E> getRepository(E entity) {
    return getRepository(entity.getClass());
  }
  
  @SuppressWarnings("unchecked")
  public <E extends BaseEntity> DataRepository<E> getRepository(Class<?> entityClass) {
    return (DataRepository<E>) repositories.getRepositoryFor(entityClass).orElse(null);
  }

  @Transactional
  public <E extends BaseEntity> Object save(E entity) {
    return getRepository(entity).save(entity);
  }  
}
