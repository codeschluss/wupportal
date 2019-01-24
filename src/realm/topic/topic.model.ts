import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { TopicEntity } from 'src/api/models/topic-entity';
import { PageModel } from '../page/page.model';
import { Translatable } from '../translation/translation.base';

export class TopicModel
  extends CrudModel implements TopicEntity {

    @Translatable() public name: string;

    public pages: PageModel[] & Observable<PageModel[]>;

  }
