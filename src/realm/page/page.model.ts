import { CrudModel } from '@portal/core';
import { PageEntity } from 'src/api/models/page-entity';

export class PageModel
  extends CrudModel implements PageEntity {

    content: string;
    title: string;
    created: string;

}
