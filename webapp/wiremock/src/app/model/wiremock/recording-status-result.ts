import { RecordingStatus } from "./recording-status";

export class RecordingStatusResult {
  status!: RecordingStatus;

  deserialize(unchecked: RecordingStatusResult): RecordingStatusResult {
    this.status = this.deserializeStatus(unchecked.status);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private deserializeStatus(unchecked: any): RecordingStatus {
    switch (unchecked) {
      case "NeverStarted":
        return RecordingStatus.NeverStarted;
      case "Recording":
        return RecordingStatus.Recording;
      case "Stopped":
        return RecordingStatus.Stopped;
      default:
        return RecordingStatus.Unknown;
    }
  }
}
