import { SmartEVSEBase, Config } from './SmartEVSEBase';
import { SmartEVSECurrentValues } from './SmartEVSECurrentValues';
import { SmartEVSENodeConfiguration } from './SmartEVSENodeConfiguration';
import { SmartEVSESystemConfiguration } from './SmartEVSESystemConfiguration';
export declare class SmartEVSE extends SmartEVSEBase {
    /**
     * Creates a connection to the Modbus TCP gateway and the Smart EVSE
     * @param {Config} opts Configuration
     * @param {string} opts.host Hostname or IP address of the Modbus TCP gateway
     * @param {number} [opts.ports=502] Port of the Modbus TCP gateway
     * @param {FirmwareVersion} [opts.fw=new] Firmware version of the Smart EVSE
     * @param {number} [opts.slaveId] The Modbus slave ID to which we need to connect. If not provided, we'll asume you use only a single Smart EVSE.
     */
    static connect(opts: Config): Promise<SmartEVSE>;
    /**
     * Disconnects the Modbus gateway & Smart EVSE
     */
    disconnect(): Promise<void>;
}
export interface SmartEVSE extends SmartEVSECurrentValues, SmartEVSENodeConfiguration, SmartEVSESystemConfiguration {
}
