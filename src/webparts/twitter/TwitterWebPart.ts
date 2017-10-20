    // tslint:disable:curly
    // tslint:disable:quotemark

import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneToggle,
  PropertyPaneSlider,
} from "@microsoft/sp-webpart-base";

import { escape } from "@microsoft/sp-lodash-subset";
// import ModuleLoader from '@microsoft/sp-module-loader';
import styles from "./TwitterWebPart.module.scss";
import * as strings from "TwitterWebPartStrings";
import { SPComponentLoader } from "@microsoft/sp-loader";
var twttr: any = require("widgets");

export interface ITwitterWebPartProps {
  account: string;
  autoLimit: boolean;
  limit: number;
  header: boolean;
  footer: boolean;
  borders: boolean;
  scrollbars: boolean;
  width: string;
  height: string;
  transparent: boolean;
  dark: boolean;
  linkColor: string;
  borderColor: string;
}

export default class TwitterWebPartWebPart extends BaseClientSideWebPart<ITwitterWebPartProps> {

  private twttr: any;

  public constructor() {
    super();
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }
  public render(): void {
    if (this.properties.account == null || this.properties.account === "") {
      var error:string = `
        <div class="ms-MessageBar">
          <div class="ms-MessageBar-content">
            <div class="ms-MessageBar-icon">
              <i class="ms-Icon ms-Icon--Info"></i>
            </div>
            <div class="ms-MessageBar-text">
              ${strings.ErrorSelectAccount}
            </div>
          </div>
        </div>
      `;
      this.domElement.innerHTML = error;
      return;
    }

    var dataChrome : string = '';
    if (this.properties.footer === false)
      dataChrome += "nofooter ";
    if (this.properties.header === false)
      dataChrome += "noheader ";
    if (this.properties.borders === false)
      dataChrome += "noborders ";
    if (this.properties.scrollbars === false)
      dataChrome += "noscrollbar ";
    if (this.properties.transparent === true)
      dataChrome += "transparent ";

    var limit:string = "";
    if (this.properties.autoLimit === false)
      limit = 'data-tweet-limit="' + this.properties.limit + '"';

    // tslint:disable-next-line:max-line-length
    var html : string = '<a class="twitter-timeline" data-link-color="' + this.properties.linkColor + '" data-border-color="' + this.properties.borderColor + '" height="' + this.properties.height + '" width="' + this.properties.width + '" ' + limit + ' data-chrome="' + dataChrome + '" href="https://twitter.com/' + this.properties.account + '">Tweets by ' + this.properties.account + '</a>';
    this.domElement.innerHTML = html;
    twttr.widgets.load();
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('account', {
                  label: strings.Account
                }),
                PropertyPaneToggle('autoLimit', {
                  label: strings.AutoLimit
                }),
                PropertyPaneSlider('limit', {
                  label: strings.Limit,
                  min: 1,
                  max: 1000,
                  step: 1
                }),
                PropertyPaneToggle('header', {
                  label: strings.Header
                }),
                PropertyPaneToggle('footer', {
                  label: strings.Footer
                }),
                PropertyPaneToggle('borders', {
                  label: strings.Borders
                }),
                PropertyPaneToggle('scrollbars', {
                  label: strings.Scrollbars
                })
              ]
            },
            {
              groupName: strings.LayoutGroupName,
              groupFields: [
                PropertyPaneTextField('width', {
                  label: strings.Width
                }),
                PropertyPaneTextField('height', {
                  label: strings.Height
                }),
                PropertyPaneToggle('transparent', {
                  label: strings.Transparent
                }),
                PropertyPaneTextField('linkColor', {
                  label: strings.LinkColor,
                  // initialColor: this.properties.linkColor,
                  // onPropertyChange: this.onPropertyChange
                }),
                PropertyPaneTextField('borderColor', {
                  label: strings.BorderColor,
                  // initialColor: this.properties.borderColor,
                  // onPropertyChange: this.onPropertyChange
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
