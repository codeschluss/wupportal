package de.codeschluss.wupportal.base;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public interface DataService<E extends BaseEntity> {
	
	public List<E> getSorted(String filter, Sort sort);
	
	public Page<E> getPaged(String filter, PageRequest page);
	
	public E getById(String id);
	
	public E add(E newEntity);
	
	public E update(String id, E updatedEntity);
	
	public void delete(String id);

}
