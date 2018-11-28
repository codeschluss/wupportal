package de.codeschluss.portal.components.translation;

import de.codeschluss.portal.core.common.DataService;

import org.springframework.stereotype.Service;

/**
 * The Class TranslationService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class TranslationService extends DataService<TranslationEntity, TranslationQueryBuilder> {

  public TranslationService(
      TranslationRepository repo, 
      TranslationQueryBuilder entities,
      TranslationResourceAssembler assembler) {
    super(repo, entities);
  }

  @Override
  public TranslationEntity getExisting(TranslationEntity newEntity) {
    return null;
  }

  @Override
  public TranslationEntity update(String id, TranslationEntity updatedEntity) {
    // TODO Auto-generated method stub
    return null;
  }
}
