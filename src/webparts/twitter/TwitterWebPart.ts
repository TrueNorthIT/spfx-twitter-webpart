import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TwitterWebPart.module.scss';
import * as strings from 'TwitterWebPartStrings';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface ITwitterWebPartProps {
  screenname: string;
}

export default class TwitterWebPartWebPart extends BaseClientSideWebPart<ITwitterWebPartProps> {
  public constructor() {
    super();
    let widget = require("widgets");
    setTimeout( () => widget.widgets.load(), 0);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.twitter}">
        <div class="${styles.container}">
        hello
            <a class="twitter-timeline"
            href="https://twitter.com/${escape(this.properties.screenname)}">
            Tweets by @${escape(this.properties.screenname)}
            </a>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
