import { CrudModel } from '@wooportal/core';
import { VideoEntity } from '../../api/models/video-entity';

export class VideoModel
  extends CrudModel implements VideoEntity {

  public platform: string;
  public url: string;

}
