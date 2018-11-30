interface Link {
  deprecation?: string;
  href?: string;
  hreflang?: string;
  media?: string;
  rel?: string;
  templated?: boolean;
  title?: string;
  type?: string;
}

export abstract class CrudModel {

  public id: string;

  public created: string;
  public modified: string;

  public _embedded?: object;
  public _links?: Link[];

}
