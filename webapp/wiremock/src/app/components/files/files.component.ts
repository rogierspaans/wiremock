import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { Item } from "../../model/wiremock/item";
import { File as WmFile } from "../../model/wiremock/file";
import { WiremockService } from "../../services/wiremock.service";
import { UtilService } from "../../services/util.service";
import { Message, MessageService, MessageType } from "../message/message.service";
import { debounceTime, filter, map, switchMap, takeUntil } from "rxjs/operators";
import { WebSocketService } from "../../services/web-socket.service";
import { AutoRefreshService } from "../../services/auto-refresh.service";
import { Subject } from "rxjs/internal/Subject";
import { FileNameComponent } from "../../dialogs/file-name/file-name.component";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "wm-files",
  templateUrl: "./files.component.html",
  styleUrl: "./files.component.scss",
})
export class FilesComponent implements OnInit, OnDestroy {
  @HostBinding("class") classes = "wmHolyGrailBody column";

  private static COPY_FAILURE = "Was not able to copy. Details in log";

  private ngUnsubscribe: Subject<boolean> = new Subject();

  files?: WmFile[];

  activeItemId?: string;

  fileContent?: any;
  language: string = "text";

  codeOptions = UtilService.aceWriteOptions();
  codeReadOnlyOptions = UtilService.aceReadOnlyOptions();


  constructor(private wiremockService: WiremockService, private messageService: MessageService,
              private webSocketService: WebSocketService,
              private autoRefreshService: AutoRefreshService,
              private modalService: NgbModal) {
  }

  onActiveItemChange(item: Item) {
    if (item) {
      this.wiremockService.getFile(item.getBodyFileName()!).subscribe({
        next: content => {
          this.fileContent = content;
          this.language = this.determineLanguage(item as WmFile);
        },
      });
    } else {
      this.fileContent = undefined;
      this.language = "text";
    }
  }

  ngOnInit(): void {
    this.loadFiles();

    this.webSocketService
      .observe("files")
      .pipe(
        filter(() => this.autoRefreshService.isAutoRefreshEnabled()),
        takeUntil(this.ngUnsubscribe),
        debounceTime(100),
      )
      .subscribe(() => {
        this.loadFiles();
      });
  }

  loadFiles() {
    this.wiremockService.getAllFiles().subscribe({
      next: fileList => {
        this.files = fileList.files;
      },
    });
  }

  editorValueChange($event: string) {
    // not yet. Maybe later.
  }

  private determineLanguage(item: WmFile) {
    let result;
    switch (item.extension) {
      case "json":
        result = "json";
        break;
      case "xml":
        result = "xml";
        break;
      case "html":
        result = "html";
        break;
      case "yaml":
      case "yml":
        result = "yaml";
        break;
      default:
        result = "text";
        break;
    }
    return result;
  }

  uploadFile(event: any) {
    const fileList = event.target.files as FileList;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      const dialog = this.modalService.open(FileNameComponent);
      dialog.componentInstance.fileName = file.name;

      fromPromise(dialog.result).pipe(switchMap(fileName => this.wiremockService.uploadFile(file, fileName)
        .pipe(map(() => fileName))),
      ).subscribe({
        next: () => {
          this.messageService.setMessage(
            new Message(`File "${file.name}" uploaded.`, MessageType.INFO),
          );
        },
        error: err => {
          this.messageService.setMessage(
            new Message(`File upload failed.\n${err.message || err}`, MessageType.ERROR),
          );
        },
      });
    }
  }

  downloadFile(item: WmFile) {
    this.wiremockService.downloadFile(item.getBodyFileName()!).subscribe({
      error: err => {
        this.messageService.setMessage(new Message(`Download failed.\n${err.message}`, MessageType.ERROR));
      },
    });
  }

  deleteFile(item: WmFile) {
    this.wiremockService.deleteFile(item.getBodyFileName()!).subscribe({
      next: () => {
        this.messageService.setMessage(
          new Message(`File "${item.getBodyFileName()}" deleted.`, MessageType.INFO),
        );
      },
      error: err => {
        this.messageService.setMessage(
          new Message(`File deletion failed.\n${err.message || err}`, MessageType.ERROR),
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  copyBodyFileName(item: WmFile) {
    if (UtilService.copyToClipboard(`"bodyFileName": "${item.getBodyFileName()}"`)) {
      this.messageService.setMessage(new Message("bodyFileName copied to clipboard", MessageType.INFO));
    } else {
      this.messageService.setMessage(new Message(FilesComponent.COPY_FAILURE, MessageType.ERROR));
    }
  }
}
