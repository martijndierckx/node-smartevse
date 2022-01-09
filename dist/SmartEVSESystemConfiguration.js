"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartEVSESystemConfiguration = void 0;
const Enums_1 = require("./Enums");
const SmartEVSEBase_1 = require("./SmartEVSEBase");
class SmartEVSESystemConfiguration extends SmartEVSEBase_1.SmartEVSEBase {
    /**
     * Returns the configured maximum charging current
     * @returns {number} Amps
     */
    get maxAllowedSystemWideChargingCurrent() {
        return this.modbusConn.getRegister(this.getMappedAddress('maxAllowedSystemWideChargingCurrent'));
    }
    /**
     * Configures the maximum system wide charging current
     * @param {number} val Amps
     * @todo To be developed
     */
    async setMaxAllowedSystemWideChargingCurrent(val) {
        //TODO
        console.log(val);
    }
    /**
     * Returns the current mode in which all SmartEVSE nodes operate
     */
    get systemMode() {
        return new Promise(async (resolve) => {
            const mode = await this.modbusConn.getRegister(this.getMappedAddress('systemMode'));
            switch (mode) {
                case 0:
                    resolve(Enums_1.Mode.Normal);
                    break;
                case 1:
                    resolve(Enums_1.Mode.Smart);
                    break;
                case 2:
                    resolve(Enums_1.Mode.Solar);
                    break;
            }
        });
    }
    /**
     * Returns the configured maximum mains current
     * @returns {number} Amps
     */
    get maxMainsCurrent() {
        return this.modbusConn.getRegister(this.getMappedAddress('maxMainsCurrent'));
    }
    /**
     * Returns the configured sensorbox grid type
     */
    get sensorboxGridType() {
        return new Promise(async (resolve) => {
            const mode = await this.modbusConn.getRegister(this.getMappedAddress('sensorboxGridType'));
            switch (mode) {
                case 0:
                    resolve(Enums_1.SensorboxGridType.FourWire);
                    break;
                case 1:
                    resolve(Enums_1.SensorboxGridType.ThreeWire);
                    break;
            }
        });
    }
    /**
     * Returns CT calibration multiplier
     * @returns {number}
     */
    get ctCalibrationMultiplier() {
        return this.modbusConn.getRegister(this.getMappedAddress('ctCalibrationMultiplier'));
    }
}
exports.SmartEVSESystemConfiguration = SmartEVSESystemConfiguration;
//# sourceMappingURL=SmartEVSESystemConfiguration.js.map