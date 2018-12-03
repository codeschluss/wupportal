package de.codeschluss.portal.core.utils;

import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.core.common.DataRepository;

import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Service;

/**
 * Repository Service to retrieve Repository.
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

  @SuppressWarnings("unchecked")
  public <E extends BaseEntity> DataRepository<E> getRepository(E entity) {
    return (DataRepository<E>) repositories.getRepositoryFor(entity.getClass()).orElse(null);
  }

  public <E extends BaseEntity> Object save(E entity) {
    return getRepository(entity).save(entity);
  }  
}
