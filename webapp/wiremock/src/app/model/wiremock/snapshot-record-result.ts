import {StubMapping} from './stub-mapping';
import {UtilService} from '../../services/util.service';

export class SnapshotRecordResult {
  mappings: StubMapping[] = [];
  ids: string[] | undefined = undefined;

  deserialize(unchecked: SnapshotRecordResult): SnapshotRecordResult {
    if (UtilService.isDefined(unchecked.mappings)) {
      this.mappings = [];
      for (const mapping of unchecked.mappings) {
        this.mappings.push(new StubMapping().deserialize(mapping));
      }
    }

    if (UtilService.isDefined(unchecked.ids)) {
      this.ids = unchecked.ids;
    }
    return this;
  }


  getIds(): string[] {
    if (this.ids) {
      return this.ids;
    }

    const result: string[] = [];

    if (UtilService.isDefined(this.mappings)) {
      for (const mapping of this.mappings) {
        result.push(mapping.uuid);
      }
    }

    return result;
  }

}
