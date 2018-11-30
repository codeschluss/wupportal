package de.codeschluss.portal.core.translations;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.stereotype.Component;

/**
 * TODO.
 * @author Valmir Etemi
 *
 */
@Component
public class TranslationInterceptorCustomizer implements HibernatePropertiesCustomizer {
  
  @Autowired
  private TranslationInterceptor interceptor;

  /* (non-Javadoc)
   * @see org.springframework.boot.autoconfigure.orm.jpa
   * .HibernatePropertiesCustomizer#customize(java.util.Map)
   */
  @Override
  public void customize(Map<String, Object> hibernateProperties) {
    hibernateProperties.put("hibernate.session_factory.interceptor", interceptor); 
  }

}
