export class BreadcrumbItem {

  label: string;
  url?: string;

  public constructor(input: { label: string; url?: string }) {
    this.label = input.label;
    this.url = input.url;
  }

  public clone() {
    return new BreadcrumbItem({ label: this.label, url: this.url });    
  }

}