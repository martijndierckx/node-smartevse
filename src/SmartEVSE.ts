import { ModbusConnection } from './ModBusConnection';
import { FirmwareVersion } from './Enums';
import { SmartEVSEBase, Config } from './SmartEVSEBase';
import { SmartEVSECurrentValues } from './SmartEVSECurrentValues';
import { SmartEVSENodeConfiguration } from './SmartEVSENodeConfiguration';
import { SmartEVSESystemConfiguration } from './SmartEVSESystemConfiguration';


export class SmartEVSE extends SmartEVSEBase {
  /**
   * Creates a connection to the Modbus TCP gateway and the Smart EVSE
   * @param {Config} opts Configuration
   * @param {string} opts.host Hostname or IP address of the Modbus TCP gateway
   * @param {number} [opts.ports=502] Port of the Modbus TCP gateway
   * @param {FirmwareVersion} [opts.fw=new] Firmware version of the Smart EVSE
   * @param {number} [opts.slaveId] The Modbus slave ID to which we need to connect. If not provided, we'll asume you use only a single Smart EVSE.
   */
  public static async connect(opts: Config) {
    const smartEVSE = new SmartEVSE(opts);

    // Determine Modbus connection config
    const defaultSlaveID = smartEVSE.config.fw == FirmwareVersion.New|| smartEVSE.config.fw === undefined ? 1 : 0;
    const connOpts = {
      host: smartEVSE.config.host,
      port: smartEVSE.config.port ?? 502,
      slaveId: smartEVSE.config.slaveId !== undefined ? smartEVSE.config.slaveId : defaultSlaveID
    };

    // Connect
    smartEVSE.modbusConn = await ModbusConnection.connect(connOpts);

    return smartEVSE;
  }

  /**
   * Disconnects the Modbus gateway & Smart EVSE
   */
  public async disconnect(): Promise<void> {
    await this.modbusConn.disconnect();
  }
}

export interface SmartEVSE extends SmartEVSECurrentValues, SmartEVSENodeConfiguration, SmartEVSESystemConfiguration {}
applyMixins(SmartEVSE, [SmartEVSECurrentValues, SmartEVSENodeConfiguration, SmartEVSESystemConfiguration]);
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
    });
  });
}
