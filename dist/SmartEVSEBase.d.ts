import { EnergyMeterType, FirmwareVersion } from './Enums';
import type { ModbusConnection } from './ModBusConnection';
export declare type Config = {
    host: string;
    port?: number;
    fw: FirmwareVersion;
    slaveId?: number;
};
export declare class SmartEVSEBase {
    protected config: Config;
    protected modbusConn: ModbusConnection;
    /**
     * Do not create a Smart EVSE object directly. Instead use the static 'connect' method.
     */
    protected constructor(opts: Config);
    /**
     * Translates the name of value to a modbus address taking in to account the FW version (addresses are different between FW versions)
     * @param {string} name Address name
     */
    protected getMappedAddress(name: string): number;
    /**
     * Helper function to interpret the types of the multiple energy meters
     */
    protected interpretMeterType(type: number): EnergyMeterType;
}
