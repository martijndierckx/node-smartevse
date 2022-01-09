"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartEVSE = void 0;
const ModBusConnection_1 = require("./ModBusConnection");
const Enums_1 = require("./Enums");
const SmartEVSEBase_1 = require("./SmartEVSEBase");
const SmartEVSECurrentValues_1 = require("./SmartEVSECurrentValues");
const SmartEVSENodeConfiguration_1 = require("./SmartEVSENodeConfiguration");
const SmartEVSESystemConfiguration_1 = require("./SmartEVSESystemConfiguration");
class SmartEVSE extends SmartEVSEBase_1.SmartEVSEBase {
    /**
     * Creates a connection to the Modbus TCP gateway and the Smart EVSE
     * @param {Config} opts Configuration
     * @param {string} opts.host Hostname or IP address of the Modbus TCP gateway
     * @param {number} [opts.ports=502] Port of the Modbus TCP gateway
     * @param {FirmwareVersion} [opts.fw=new] Firmware version of the Smart EVSE
     * @param {number} [opts.slaveId] The Modbus slave ID to which we need to connect. If not provided, we'll asume you use only a single Smart EVSE.
     */
    static async connect(opts) {
        const smartEVSE = new SmartEVSE(opts);
        // Determine Modbus connection config
        const defaultSlaveID = smartEVSE.config.fw == Enums_1.FirmwareVersion.New || smartEVSE.config.fw === undefined ? 1 : 0;
        const connOpts = {
            host: smartEVSE.config.host,
            port: smartEVSE.config.port ?? 502,
            slaveId: smartEVSE.config.slaveId !== undefined ? smartEVSE.config.slaveId : defaultSlaveID
        };
        // Connect
        smartEVSE.modbusConn = await ModBusConnection_1.ModbusConnection.connect(connOpts);
        return smartEVSE;
    }
    /**
     * Disconnects the Modbus gateway & Smart EVSE
     */
    async disconnect() {
        await this.modbusConn.disconnect();
    }
}
exports.SmartEVSE = SmartEVSE;
applyMixins(SmartEVSE, [SmartEVSECurrentValues_1.SmartEVSECurrentValues, SmartEVSENodeConfiguration_1.SmartEVSENodeConfiguration, SmartEVSESystemConfiguration_1.SmartEVSESystemConfiguration]);
function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
        });
    });
}
//# sourceMappingURL=SmartEVSE.js.map