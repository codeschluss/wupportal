package de.codeschluss.portal.components.translation;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.common.DataService;

import org.springframework.stereotype.Service;

@Service
public class TranslationService extends DataService<TranslationEntity, QTranslationEntity> {

  public TranslationService(
      TranslationRepository repo, 
      TranslationResourceAssembler assembler) {
    super(repo, assembler, QTranslationEntity.translationEntity);
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

  @Override
  protected Predicate getFilteredPredicate(String filter) {
    // TODO Auto-generated method stub
    return null;
  }

}
