import { CrudModel } from '@portal/core';
import { TopicEntity } from 'src/api/models/topic-entity';
import { Observable } from 'rxjs';
import { PageModel } from '../page/page.model';

export class TopicModel
  extends CrudModel implements TopicEntity {

    public name: string;

    public pages: Observable<PageModel[]>;

  }
