"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartEVSENodeConfiguration = void 0;
const Enums_1 = require("./Enums");
const SmartEVSEBase_1 = require("./SmartEVSEBase");
class SmartEVSENodeConfiguration extends SmartEVSEBase_1.SmartEVSEBase {
    /**
     * Returns the way the charging cable is connected to the Smart EVSE
     */
    get connectionType() {
        return new Promise(async (resolve) => {
            const connType = await this.modbusConn.getRegister(this.getMappedAddress('connectionType'));
            switch (connType) {
                case 0:
                    resolve(Enums_1.ConnectionType.Socket);
                    break;
                case 1:
                    resolve(Enums_1.ConnectionType.FixedCable);
                    break;
            }
        });
    }
    /**
     * Returns the load balancing configuration of the Smart EVSE
     */
    get loadBalancingConfig() {
        return new Promise(async (resolve) => {
            const config = await this.modbusConn.getRegister(this.getMappedAddress('loadBalancingConfig'));
            switch (config) {
                case 0:
                    resolve(Enums_1.LoadBalancingConfig.Disabled);
                    break;
                case 1:
                    resolve(Enums_1.LoadBalancingConfig.Master);
                    break;
                case 2:
                    resolve(Enums_1.LoadBalancingConfig.Node1);
                    break;
                case 3:
                    resolve(Enums_1.LoadBalancingConfig.Node2);
                    break;
                case 4:
                    resolve(Enums_1.LoadBalancingConfig.Node3);
                    break;
                case 5:
                    resolve(Enums_1.LoadBalancingConfig.Node4);
                    break;
                case 6:
                    resolve(Enums_1.LoadBalancingConfig.Node5);
                    break;
                case 7:
                    resolve(Enums_1.LoadBalancingConfig.Node6);
                    break;
                case 7:
                    resolve(Enums_1.LoadBalancingConfig.Node7);
                    break;
            }
        });
    }
    /**
     * Returns the configured minimum accepted charging current by the vehicle
     * @returns {number} Amps
     */
    get minAcceptedChargingCurrent() {
        return this.modbusConn.getRegister(this.getMappedAddress('minAcceptedChargingCurrent'));
    }
    /**
     * Returns the configured maximum accepted charging current by the vehicle
     * @returns {number} Amps
     */
    get maxAcceptedChargingCurrent() {
        return this.modbusConn.getRegister(this.getMappedAddress('maxAcceptedChargingCurrent'));
    }
    /**
     * Returns the way the charging cable is connected to the Smart EVSE
     */
    get cableLockType() {
        return new Promise(async (resolve) => {
            const connType = await this.modbusConn.getRegister(this.getMappedAddress('cableLockType'));
            switch (connType) {
                case 0:
                    resolve(Enums_1.CableLockType.Disabled);
                    break;
                case 1:
                    resolve(Enums_1.CableLockType.Solenoid);
                    break;
                case 2:
                    resolve(Enums_1.CableLockType.Motor);
                    break;
            }
        });
    }
    /**
     * Returns the configured maximum accepted charging current by the vehicle
     * @returns {number} Amps
     * Moved to System Configuration in newer FW versions
     */
    get startChargingAtSurplusSolarCurrent() {
        return this.modbusConn.getRegister(this.getMappedAddress('startChargingAtSurplusSolarCurrent'));
    }
    /**
     * Returns the configured solar charging time at 6 Amps
     * @returns {number} mins (0: Disabled)
     * Moved to System Configuration in newer FW versions
     */
    get stopSolarChargingAt6AmpsAfter() {
        return this.modbusConn.getRegister(this.getMappedAddress('stopSolarChargingAt6AmpsAfter'));
    }
    /**
     * Returns the configuration for the external switch
     */
    get externalSwitchConfiguration() {
        return new Promise(async (resolve) => {
            const config = await this.modbusConn.getRegister(this.getMappedAddress('externalSwitchConfiguration'));
            switch (config) {
                case 0:
                    resolve(Enums_1.ExternalSwitchConfiguration.Disabled);
                    break;
                case 1:
                    resolve(Enums_1.ExternalSwitchConfiguration.AccessPushButton);
                    break;
                case 2:
                    resolve(Enums_1.ExternalSwitchConfiguration.AccessSwitch);
                    break;
                case 3:
                    resolve(Enums_1.ExternalSwitchConfiguration.SmartSolarPushButton);
                    break;
                case 4:
                    resolve(Enums_1.ExternalSwitchConfiguration.SmartSolarSwitch);
                    break;
            }
        });
    }
    /**
     * Returns whether a Residual Current Monitor has been configured
     */
    get residualCurrentMonitorEnabled() {
        return new Promise(async (resolve) => {
            resolve((await this.modbusConn.getRegister(this.getMappedAddress('residualCurrentMonitorEnabled'))) == 1);
        });
    }
    /**
     * Returns how much grid power (A) is allowed when solar charging
     * @returns {number} Amps
     * Moved to System Configuration in newer FW versions
     */
    get allowedGridPowerWhenSolarCharging() {
        return this.modbusConn.getRegister(this.getMappedAddress('allowedGridPowerWhenSolarCharging'));
    }
    /**
     * Returns whether an RFID reader has been configured
     */
    get rfidReaderEnabled() {
        return new Promise(async (resolve) => {
            resolve((await this.modbusConn.getRegister(this.getMappedAddress('rfidReaderEnabled'))) == 1);
        });
    }
    /**
     * Returns the type of the configured energy meter
     */
    get vehicleEnergyMeterType() {
        return new Promise(async (resolve) => {
            const type = await this.modbusConn.getRegister(this.getMappedAddress('vehicleEnergyMeterType'));
            const meterType = this.interpretMeterType(type);
            resolve(meterType);
        });
    }
    /**
     * Returns the Modbus address of the configured energy meter
     */
    get vehicleEnergyMeterAddress() {
        return this.modbusConn.getRegister(this.getMappedAddress('energyMeterAddress'));
    }
}
exports.SmartEVSENodeConfiguration = SmartEVSENodeConfiguration;
//# sourceMappingURL=SmartEVSENodeConfiguration.js.map