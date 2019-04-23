/**
 * 
 */
class CityView extends egret.Sprite {

    private airport: AirPort;
    private bank: Bank;
    private gasStation: GasStation;
    private scenery: Scenery;
    private science: Science;
    private sheet: egret.SpriteSheet;

    private cityId;
    private buildingList = [this.airport, this.bank, this.gasStation, this.scenery, this.science];
    private buildings = [0, 0, 0, 0, 0];

    /**
     * 
     */
    constructor() {
        super();
        this.airport = new AirPort();
        this.bank = new Bank();
        this.gasStation = new GasStation();
        this.scenery = new Scenery();
        this.science = new Science();
        // this.airport.x = this.airport.y = this.bank.x = this.bank.y = this.gasStation.x = this.gasStation.y = 0;
        // this.scenery.y = this.scenery.y = this.science.x = this.science.y = 0;
        this.addChild(this.airport);
        this.addChild(this.bank);
        this.addChild(this.gasStation);
        this.addChild(this.scenery);
        this.addChild(this.science);
    }

    private update() {
        this.science.update(this.sheet.getTexture("building" + 5 + "_" + 2));
        this.gasStation.update(this.sheet.getTexture("building" + 3 + "_" + 1));
        this.bank.update(this.sheet.getTexture("building" + 2 + "_" + 3));
        this.scenery.update(this.sheet.getTexture("building" + 4 + "_" + 1));
        this.airport.update(this.sheet.getTexture("building" + 1 + "_" + 1));
    }

    public setCityView(cityId, buildings) {
        this.cityId = cityId;
        this.buildings = buildings;
        this.sheet = RES.getRes("city" + cityId + "_sheet");
        this.update();
    }

    public levelUPBuilding(id) {
        this.buildingList[id - 1].update("building" + this.cityId + "_" + 1);
    }
}