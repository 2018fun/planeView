/**
 * 
 * 城市讯息
 */
class CityMessageView extends egret.Sprite {

    private viewBg: egret.Bitmap;

    private msgContainer: egret.Sprite;

    constructor() {
        super();
        this.initView();
    }

    private initView() {
        this.viewBg = new egret.Bitmap();
        this.viewBg.texture = RES.getRes("msg_png");
        // this.viewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.viewBg);

        this.msgContainer = new egret.Sprite();
        this.addChild(this.msgContainer);
        this.renderAirportMsg();
    }

    private updateView() {

    }

    public renderBanner() {

    }

    public renderPosition(buildingData) {
        this.msgContainer.removeChildren();
        switch (buildingData.id) {
            case BuildingEnum.AIRPORT:
                this.renderAirportMsg();
                break;
            case BuildingEnum.BANK:
                this.renderBankMsg();
                break;

            case BuildingEnum.BULLET_SCIENCE:
                this.renderScience();
                break;

            case BuildingEnum.GAS_STATION:
                this.renderStation();
                break;

            case BuildingEnum.INSURE_COMPANY:
                this.renderCompany();
                break;

            case BuildingEnum.DEFENSE:
                this.renderDefense();
                break;

            case BuildingEnum.REPAIR_FACTORY:
                this.renderFactory();
                break;
        }
    }

    /**
     * 飞机场详细信息
     */
    private renderAirportMsg() {
        //建筑等级
        let airportLevel = CityController.getInstance().getTopLevel(BuildingEnum.AIRPORT);
        let data: AirportData = BuildingDataCache.getInstance().getAirportDataByLevel(airportLevel);
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        nameText.x = 10;
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = i18n.getInstance().getLanguage("ui_level") + airportLevel;
        levelText.x = 10 + nameText.width + 100;
        this.msgContainer.addChild(levelText);

        let scoreText = new egret.TextField();

        let descText = new egret.TextField();
        descText.text = i18n.getInstance().getLanguage(data.desc);
        descText.x = 10;
        descText.y = nameText.height;
        descText.width = this.viewBg.width - 40;
        descText.multiline = true;
        this.msgContainer.addChild(descText);

        let yoursText = new egret.TextField();


    }

    private renderBankMsg() {

        let block = CityController.getInstance().getBuildingBlockByType(BuildingEnum.BANK);

        //建筑等级
        let bankLevel = CityController.getInstance().getTopLevel(BuildingEnum.BANK);;
        let data: BankData = BuildingDataCache.getInstance().getBankDataByLevel(bankLevel);
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = "等级" + bankLevel.toString();
        levelText.y = nameText.height;
        this.msgContainer.addChild(levelText);

        let amout = CityController.getInstance().getBuildingNum(BuildingEnum.BANK);
    }

    private renderScience() {

        //建筑等级
        let scienceLevel = CityController.getInstance().getTopLevel(BuildingEnum.BULLET_SCIENCE);;
        let data: BulletScienceData = BuildingDataCache.getInstance().getBulletScienceByLevel(scienceLevel);
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = "等级" + scienceLevel.toString();
        levelText.y = nameText.height;
        this.msgContainer.addChild(levelText);

        let amout = CityController.getInstance().getBuildingNum(BuildingEnum.BULLET_SCIENCE);

    }

    private renderFactory() {

        //建筑等级
        let factoryLevel = CityController.getInstance().getTopLevel(BuildingEnum.REPAIR_FACTORY);;
        let data: RepairFactoryData = BuildingDataCache.getInstance().getRepairFactoryByLevel(factoryLevel);
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = "等级" + factoryLevel.toString();
        levelText.y = nameText.height;
        this.msgContainer.addChild(levelText);

        let amout = CityController.getInstance().getBuildingNum(BuildingEnum.REPAIR_FACTORY);

    }

    private renderCompany() {

        //建筑等级
        let insureLevel = CityController.getInstance().getTopLevel(BuildingEnum.INSURE_COMPANY);;
        let data: InsureCompanyData = BuildingDataCache.getInstance().getInsureCompanyByLevel(insureLevel);
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = "等级" + insureLevel.toString();
        levelText.y = nameText.height;
        this.msgContainer.addChild(levelText);

        let amout = CityController.getInstance().getBuildingNum(BuildingEnum.INSURE_COMPANY);

    }

    private renderDefense() {

        //建筑等级
        let defenseLevel = CityController.getInstance().getTopLevel(BuildingEnum.DEFENSE);;
        let data: DefenseData = BuildingDataCache.getInstance().getDefenseByLevel(defenseLevel);
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = "等级" + defenseLevel.toString();
        levelText.y = nameText.height;
        this.msgContainer.addChild(levelText);

        let amout = CityController.getInstance().getBuildingNum(BuildingEnum.DEFENSE);

    }

    private renderStation() {

        //建筑等级
        let gasStationLevel = CityController.getInstance().getTopLevel(BuildingEnum.GAS_STATION);;
        let data: GasStationData = BuildingDataCache.getInstance().getGasStationByLevel(gasStationLevel);
        let nameText = new egret.TextField();
        nameText.text = i18n.getInstance().getLanguage(data.name);
        this.msgContainer.addChild(nameText);
        let levelText = new egret.TextField();
        levelText.text = "等级" + gasStationLevel.toString();
        levelText.y = nameText.height;
        this.msgContainer.addChild(levelText);

        let amout = CityController.getInstance().getBuildingNum(BuildingEnum.GAS_STATION);

    }
}