import { EnergyMeterType, FirmwareVersion } from './Enums';
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

  /**
   * Helper function to interpret the types of the multiple energy meters
   */
  protected interpretMeterType(type: number): EnergyMeterType {
    switch (type) {
      case 0:
        return EnergyMeterType.Disabled;
      case 1:
        return EnergyMeterType.Sensorbox;
      case 2:
        return EnergyMeterType.Phoenix;
      case 3:
        return EnergyMeterType.Finder;
      case 4:
        return EnergyMeterType.Eastron;
      case 5:
        return EnergyMeterType.ABB;
      case 6:
        return this.config.fw == FirmwareVersion.New ? EnergyMeterType.Solaredge : EnergyMeterType.Custom;
      case 7: // New FW only
        return EnergyMeterType.Wago;
      case 8: // New FW only
        return EnergyMeterType.Custom;
    }

    return null;
  }
}
