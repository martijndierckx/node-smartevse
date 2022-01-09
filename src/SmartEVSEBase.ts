import type { FirmwareVersion } from '.';
import type { ModbusConnection } from './ModBusConnection';
import AddressMapping from './AddressMapping.json';

export type Config = {
  host: string;
  port?: number;
  fw: FirmwareVersion;
  slaveId?: number;
};

export class SmartEVSEBase {
  protected config: Config;
  protected modbusConn: ModbusConnection;

  /**
   * Do not create a Smart EVSE object directly. Instead use the static 'connect' method.
   */
  protected constructor(opts: Config) {
    this.config = opts;
  }

  /**
   * Translates the name of value to a modbus address taking in to account the FW version (addresses are different between FW versions)
   * @param {string} name Address name
   */
   protected getMappedAddress(name: string): number {
    return AddressMapping[name][this.config.fw] as number;
  }
}
