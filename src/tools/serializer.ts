import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class ClientUrlSerializer
  implements UrlSerializer {

  private serializer: UrlSerializer = new DefaultUrlSerializer();

  public parse(url: string): UrlTree {
    return this.serializer.parse(url.replace(/\+/g, '%20'));
  }

  public serialize(tree: UrlTree): string {
    return this.serializer.serialize(tree).replace(/%20/g, '+');
  }

}
