import { Mode } from './Enums';
import { SmartEVSEBase } from './SmartEVSEBase';

export class SmartEVSESystemConfiguration extends SmartEVSEBase {
  /**
   * Returns the configured maximum charging current
   * @returns {number} Amps
   */
  public get maxAllowedSystemWideChargingCurrent(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('maxAllowedSystemWideChargingCurrent'));
  }

  /**
   * Configures the maximum system wide charging current
   * @param {number} val Amps
   * @todo To be developed
   */
  public async setMaxAllowedSystemWideChargingCurrent(val: number): Promise<void> {
    //TODO
    console.log(val);
  }

  /**
   * Returns the current mode in which all SmartEVSE nodes operate
   */
  public get systemMode(): Promise<Mode> {
    return new Promise(async (resolve) => {
      const mode = await this.modbusConn.getRegister(this.getMappedAddress('systemMode'));
      switch (mode) {
        case 0:
          resolve(Mode.Normal);
          break;
        case 1:
          resolve(Mode.Smart);
          break;
        case 2:
          resolve(Mode.Solar);
          break;
      }
    });
  }

  /**
   * Returns the configured maximum mains current
   * @returns {number} Amps
   */
  public get maxMainsCurrent(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('maxMainsCurrent'));
  }
}
