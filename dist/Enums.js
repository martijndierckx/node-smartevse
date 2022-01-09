"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorboxGridType = exports.EnergyMeterType = exports.ExternalSwitchConfiguration = exports.LoadBalancingConfig = exports.CableLockType = exports.ConnectionType = exports.Mode = exports.ErrorState = exports.State = exports.FirmwareVersion = void 0;
var FirmwareVersion;
(function (FirmwareVersion) {
    FirmwareVersion["New"] = ">2.20";
    FirmwareVersion["Old"] = "<=2.20";
})(FirmwareVersion = exports.FirmwareVersion || (exports.FirmwareVersion = {}));
var State;
(function (State) {
    State["Connected"] = "connected";
    State["Charging"] = "charging";
})(State = exports.State || (exports.State = {}));
var ErrorState;
(function (ErrorState) {
    ErrorState["None"] = "none";
    ErrorState["Less6A"] = "less-6A";
    ErrorState["NoComm"] = "no-comm";
    ErrorState["TempHigh"] = "temp-high";
    ErrorState["Unused"] = "unused";
    ErrorState["RCD"] = "RCD";
    ErrorState["NoSun"] = "no-sun";
})(ErrorState = exports.ErrorState || (exports.ErrorState = {}));
var Mode;
(function (Mode) {
    Mode["Normal"] = "normal";
    Mode["Smart"] = "smart";
    Mode["Solar"] = "solar";
})(Mode = exports.Mode || (exports.Mode = {}));
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["Socket"] = "socket";
    ConnectionType["FixedCable"] = "cable";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
var CableLockType;
(function (CableLockType) {
    CableLockType["Disabled"] = "disabled";
    CableLockType["Solenoid"] = "solenoid";
    CableLockType["Motor"] = "motor";
})(CableLockType = exports.CableLockType || (exports.CableLockType = {}));
var LoadBalancingConfig;
(function (LoadBalancingConfig) {
    LoadBalancingConfig["Disabled"] = "disabled";
    LoadBalancingConfig["Master"] = "master";
    LoadBalancingConfig["Node1"] = "node1";
    LoadBalancingConfig["Node2"] = "node2";
    LoadBalancingConfig["Node3"] = "node3";
    LoadBalancingConfig["Node4"] = "node4";
    LoadBalancingConfig["Node5"] = "node5";
    LoadBalancingConfig["Node6"] = "node6";
    LoadBalancingConfig["Node7"] = "node7"; // Only possible on > FW 2.20
})(LoadBalancingConfig = exports.LoadBalancingConfig || (exports.LoadBalancingConfig = {}));
var ExternalSwitchConfiguration;
(function (ExternalSwitchConfiguration) {
    ExternalSwitchConfiguration["Disabled"] = "disabled";
    ExternalSwitchConfiguration["AccessPushButton"] = "access-push-button";
    ExternalSwitchConfiguration["AccessSwitch"] = "access-switch";
    ExternalSwitchConfiguration["SmartSolarPushButton"] = "smart-solar-push-button";
    ExternalSwitchConfiguration["SmartSolarSwitch"] = "smart-solar-switch";
})(ExternalSwitchConfiguration = exports.ExternalSwitchConfiguration || (exports.ExternalSwitchConfiguration = {}));
var EnergyMeterType;
(function (EnergyMeterType) {
    EnergyMeterType["Disabled"] = "disabled";
    EnergyMeterType["Sensorbox"] = "sensorbox";
    EnergyMeterType["Finder"] = "finder";
    EnergyMeterType["Eastron"] = "eastron";
    EnergyMeterType["ABB"] = "abb";
    EnergyMeterType["Solaredge"] = "solaredge";
    EnergyMeterType["Wago"] = "wago";
    EnergyMeterType["Phoenix"] = "phoenix";
    EnergyMeterType["Custom"] = "custom";
})(EnergyMeterType = exports.EnergyMeterType || (exports.EnergyMeterType = {}));
var SensorboxGridType;
(function (SensorboxGridType) {
    SensorboxGridType[SensorboxGridType["FourWire"] = 4] = "FourWire";
    SensorboxGridType[SensorboxGridType["ThreeWire"] = 3] = "ThreeWire";
})(SensorboxGridType = exports.SensorboxGridType || (exports.SensorboxGridType = {}));
//# sourceMappingURL=Enums.js.map