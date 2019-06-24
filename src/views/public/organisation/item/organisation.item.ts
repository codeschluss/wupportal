import { Component, Input } from '@angular/core';
import { SessionProvider } from '@wooportal/core';
import { OrganisationModel } from '../../../../base/models/organisation.model';

@Component({
  selector: 'organisation-item',
  styleUrls: ['organisation.item.scss'],
  templateUrl: 'organisation.item.html'
})

export class OrganisationItemComponent {

  @Input()
  private item: OrganisationModel;

  public get description(): string {
    return this.item.description;
  }

  public get imageCaption(): string {
    return `${this.name}: ${this.item.images[0].caption}`;
  }

  public get imageSource(): string {
    const image = this.item.images[0];
    return `url(data:${image.mimeType};base64,${image.imageData})`;
  }

  public get name(): string {
    return this.item.name;
  }

  public get suburb(): string {
    return this.item.address.suburb.name;
  }

  public constructor(
    private sessionProvider: SessionProvider
  ) { }

  public hasImage(): boolean {
    return !!this.item.images.length;
  }

  public hasLike(): boolean {
    return this.sessionProvider.isLiked(this.item.id);
  }

  public like(): void {
    this.sessionProvider.like(this.item.id);
  }

  public share(): void {
    console.log(this.item);
  }

}
