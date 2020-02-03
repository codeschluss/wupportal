import { CrudModel } from './crud.model';

export function Translate(): (model: CrudModel, field: string) => void {
  return (model: CrudModel, field: string) => {
    Object.defineProperty(model.constructor, 'translatable', {
      value: ((model.constructor as any).translatable || []).concat(field),
      configurable: true
    });
  };
}
