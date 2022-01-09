"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartEVSEBase = void 0;
const tslib_1 = require("tslib");
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
}
exports.SmartEVSEBase = SmartEVSEBase;
//# sourceMappingURL=SmartEVSEBase.js.map