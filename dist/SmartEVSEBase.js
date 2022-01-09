"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartEVSEBase = void 0;
const tslib_1 = require("tslib");
const Enums_1 = require("./Enums");
const AddressMapping_json_1 = (0, tslib_1.__importDefault)(require("./AddressMapping.json"));
class SmartEVSEBase {
    /**
     * Do not create a Smart EVSE object directly. Instead use the static 'connect' method.
     */
    constructor(opts) {
        this.config = opts;
    }
    /**
     * Translates the name of value to a modbus address taking in to account the FW version (addresses are different between FW versions)
     * @param {string} name Address name
     */
    getMappedAddress(name) {
        return AddressMapping_json_1.default[name][this.config.fw];
    }
    /**
     * Helper function to interpret the types of the multiple energy meters
     */
    interpretMeterType(type) {
        switch (type) {
            case 0:
                return Enums_1.EnergyMeterType.Disabled;
            case 1:
                return Enums_1.EnergyMeterType.Sensorbox;
            case 2:
                return Enums_1.EnergyMeterType.Phoenix;
            case 3:
                return Enums_1.EnergyMeterType.Finder;
            case 4:
                return Enums_1.EnergyMeterType.Eastron;
            case 5:
                return Enums_1.EnergyMeterType.ABB;
            case 6:
                return this.config.fw == Enums_1.FirmwareVersion.New ? Enums_1.EnergyMeterType.Solaredge : Enums_1.EnergyMeterType.Custom;
            case 7: // New FW only
                return Enums_1.EnergyMeterType.Wago;
            case 8: // New FW only
                return Enums_1.EnergyMeterType.Custom;
        }
        return null;
    }
}
exports.SmartEVSEBase = SmartEVSEBase;
//# sourceMappingURL=SmartEVSEBase.js.map