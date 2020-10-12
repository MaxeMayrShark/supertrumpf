export default class Car {
    static properties = {
        laenge: { label: 'Länge', unit: 'm' },
        gewicht: { label: 'Gewicht', unit: 'kg' },
        hubraum: { label: 'Hubraum', unit: 'cm³' },
        leistung: { label: 'Leistung', unit: 'PS' },
        max: { label: 'Max. Km/h', unit: '' },
    };

    constructor(name, image, laenge, gewicht, hubraum, leistung, max) {
        this.name = name;
        this.image = image;
        this.laenge = laenge;
        this.gewicht = gewicht;
        this.hubraum = hubraum;
        this.leistung = leistung;
        this.max = max;
    }
}