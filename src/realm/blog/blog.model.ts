import { CrudModel } from '@portal/core';
import { BlogEntity } from '../../api/models/blog-entity';

export class BlogModel
  extends CrudModel implements BlogEntity {

    author: string;
    content: string;
    likes: number;
    title: string;
    created: string;

}
