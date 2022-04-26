export class Persona {
    id?:number
    name: string;
    image: string;
    position: string;
    ubication: string;
    company: string;
    img: string;
    url: String;
    school: String;
    img2: String;
    url2: String;

    constructor(name: string, image: string, position: string, ubication: string, company: string,
         img: string, url: string, school: string, img2: string, url2: string ){
             this.name=name;
             this.image=image;
             this.position=position;
             this.ubication=ubication;
             this.company=company;
             this.img=img;
             this.url=url;
             this.school=school;
             this.img2=img2;
             this.url2=url2;
    }

}

