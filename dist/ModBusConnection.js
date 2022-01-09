"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModbusConnection = void 0;
const tslib_1 = require("tslib");
const Modbus = (0, tslib_1.__importStar)(require("jsmodbus"));
const net_1 = require("net");
class ModbusConnection {
    constructor() {
        this.conn = null;
    }
    static async connect(config) {
        return new Promise((resolve) => {
            const modbusConn = new ModbusConnection();
            modbusConn.socket = new net_1.Socket();
            modbusConn.conn = new Modbus.client.TCP(modbusConn.socket, config.slaveId);
            // Events
            modbusConn.socket.on('connect', () => {
                resolve(modbusConn);
            });
            modbusConn.socket.on('end', () => {
                modbusConn.conn = null;
                // TODO reconnect on request?
            });
            modbusConn.socket.connect(config);
        });
    }
    async disconnect() {
        this.socket.end(() => {
            return;
        });
    }
    async getRegister(address) {
        const register = await this.getRegisterRange(address, 1);
        return register[address];
    }
    async getRegisterRange(startAddress, quantity) {
        const res = await this.conn.readInputRegisters(startAddress, quantity);
        // Was data returned?
        if (res.response && res.response.body && !res.response.body.isException && res.response.body.byteCount > 0) {
            // Convert to correctly addressed object
            const data = {};
            for (const [i, val] of res.response.body.values.entries()) {
                data[startAddress + i] = val;
            }
            // Return data
            return data;
        }
        // Nothing returned
        throw Error(`Failed retrieving register range ${startAddress} - ${startAddress + quantity - 1}`);
    }
}
exports.ModbusConnection = ModbusConnection;
//# sourceMappingURL=ModBusConnection.js.map