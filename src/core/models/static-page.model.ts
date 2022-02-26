import { Observable } from 'rxjs';
import { MarkupEntity } from '../../api/models/markup-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';
import { ImageModel } from './image.model';

export class StaticPageModel
  extends CrudModel
  implements MarkupEntity {

  @Translate() public content: string;

  public tagId: string;

  public image: ImageModel & Observable<ImageModel>;

  public get label(): string | undefined {
    return this.tagId;
  }

}
