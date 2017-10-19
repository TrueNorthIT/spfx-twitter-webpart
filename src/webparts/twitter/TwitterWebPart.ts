import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TwitterWebPart.module.scss';
import * as strings from 'TwitterWebPartStrings';
import { SPComponentLoader } from '@microsoft/sp-loader';
import "widgets";

export interface ITwitterWebPartProps {
  screenname: string;
  tweetlimit:number;
  height:number;
}

export default class TwitterWebPartWebPart extends BaseClientSideWebPart<ITwitterWebPartProps> {
  widget:any;
  public constructor() {
    super();
    this.widget = require("widgets");
  }
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.twitter}">
        <div class="${styles.container}">
            <a class="twitter-timeline"
            data-tweet-limit="${this.properties.tweetlimit}"
            data-height="${this.properties.height}"
            href="https://twitter.com/${escape(this.properties.screenname)}">
            Tweets by @${escape(this.properties.screenname)}
            </a>
        </div>
      </div>`;
      setTimeout( () => this.widget.widgets.load(), 0);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('screenname', {
                  label: 'Screenname'
                }),
                PropertyPaneTextField('tweetlimit', {
                  label: 'Tweet limit'
                }),
                PropertyPaneTextField('height', {
                  label: 'Height'
                }),
                PropertyPaneLabel("height", { text: "Height is ignored if tweet limit is set"} ),
              ]
            }
          ]
        }
      ]
    };
  }
}
