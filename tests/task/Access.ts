import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Access {
  static to(accessPage: string) {
    return new Access(accessPage);
  }

  private constructor(private accessPage: string) {}

  async perform(actor: BrowseTheWeb) {
    await actor.visit(this.accessPage);
  }
}
