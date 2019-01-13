import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { TopicEntity } from 'src/api/models/topic-entity';
import { PageModel } from '../page/page.model';

export class TopicModel
  extends CrudModel implements TopicEntity {

    public name: string;

    public pages: PageModel[] & Observable<PageModel[]>;

  }
