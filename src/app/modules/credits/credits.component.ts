import { Component, OnInit } from '@angular/core';


interface CreditsForImage {
  localAsset: string;
  originalFilename?: string;
  name?: string;
  downloadedFrom?: string;
  url?: {
    text: string;
    href: string;
  };
  designer?: string;
}

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {
  readonly keyMap: Record<string, string> = {
    'originalFilename': $localize`Original filename`,
    'name': $localize`Name`,
    'downloadedFrom': $localize`Download from`,
    'designer': $localize`Designed by`,
  }

  images: CreditsForImage[] = [

    {
      localAsset: 'assets/images/login-sent.jpg',
      originalFilename: '59877.jpg',
      name: 'character-illustration-people-with-internet-message-icons',
      downloadedFrom: 'freepik.com',
      url: {
        text: 'Email notification vector created by rawpixel.com - www.freepik.com',
        href: 'https://www.freepik.com/vectors/email-notification'
      },
      designer: 'rawpixel.com / Freepik'
    },

    {
      localAsset: 'assets/images/404-monster.jpg',
      originalFilename: '2001.i203.007_cartoon_monster_set-21.jpg',
      name: 'cute-angry-purple-devil-with-little-horns-tail-cartoon-illustration',
      downloadedFrom: 'freepik.com',
      url: {
        text: 'Cute monster vector created by macrovector - www.freepik.com',
        href: 'https://www.freepik.com/vectors/cute-monster'
      },
      designer: 'macrovector / Freepik'
    },

    {
      localAsset: 'assets/images/login-thumb.jpg',
      originalFilename: '20944201.jpg',
      name: 'access-control-system-abstract-concept',
      downloadedFrom: 'freepik.com',
      url: {
        text: 'Access control vector created by vectorjuice - www.freepik.com',
        href: 'https://www.freepik.com/vectors/access-control'
      },
      designer: 'vectorjuice / Freepik'
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
