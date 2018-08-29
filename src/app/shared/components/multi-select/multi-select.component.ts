import { Component, OnInit, Input, Output, EventEmitter, HostListener } from "@angular/core";

@Component({
  selector: "app-multi-select",
  templateUrl: "multi-select.component.html",
  styleUrls: ["multi-select.component.scss"]
})
export class MultiSelectComponent implements OnInit {
  @Input()
  public options: string[];

  @Input()
  public multiple?: boolean = true;

  @Input()
  public label: string;

  @Output()
  public selectionChange: EventEmitter<string[]> = new EventEmitter();

  public open = false;
  private selectedValues: { [key: string]: boolean } = {};

  constructor() {}

  public ngOnInit(): void {
    for (const option of this.options) {
      this.selectedValues[option] = false;
    }
  }

  public toggleSelect(): void {
    this.open = !this.open;
  }

  public closeSelect(): void {
    this.open = false;
  }

  public onCheckChange(option: string, event: any): void {
    this.selectedValues[option] = event.target.checked;
    const selectedOptions = this.toArray(this.selectedValues);
    this.selectionChange.emit(selectedOptions);
  }

  public onRadioChange(option: string): void {
    this.selectionChange.emit([option]);
  }

  public onRadioAll(): void {
    this.selectionChange.emit(this.options);
  }

  private toArray(values: { [key: string]: boolean }): string[] {
    const out: string[] = [];
    for (const option in values) {
      if (values[option]) {
        out.push(option);
      }
    }
    return out;
  }

  @HostListener("document:keyup", ["$event"])
  public onKeyUp(ev: KeyboardEvent): void {
    if (ev.key === "Escape") {
      this.open = false;
    }
  }

  @HostListener("document:click", ["$event"])
  public onClickDocument(ev: MouseEvent): void {
    this.open = false;
  }
}
