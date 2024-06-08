import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Actor {
  constructor(private ability: BrowseTheWeb) {}

  attemptsTo(task: { perform: (ability: BrowseTheWeb) => Promise<void> }) {
    return task.perform(this.ability);
  }
}
