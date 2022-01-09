import { EnergyMeterCaptureType, EnergyMeterType, Mode, SensorboxGridType } from './Enums';
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

  /**
   * Returns the configured sensorbox grid type
   */
  public get sensorboxGridType(): Promise<SensorboxGridType> {
    return new Promise(async (resolve) => {
      const mode = await this.modbusConn.getRegister(this.getMappedAddress('sensorboxGridType'));
      switch (mode) {
        case 0:
          resolve(SensorboxGridType.FourWire);
          break;
        case 1:
          resolve(SensorboxGridType.ThreeWire);
          break;
      }
    });
  }

  /**
   * Returns CT calibration multiplier
   * @returns {number}
   */
  public get ctCalibrationMultiplier(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('ctCalibrationMultiplier'));
  }

  /**
   * Returns the type of the configured mains energy meter
   */
  public get mainsEnergyMeterType(): Promise<EnergyMeterType> {
    return new Promise(async (resolve) => {
      const type = await this.modbusConn.getRegister(this.getMappedAddress('mainsEnergyMeterType'));
      const meterType = this.interpretMeterType(type);
      resolve(meterType);
    });
  }

  /**
   * Returns the Modbus address of the configured mains energy meter
   */
  public get mainsEnergyMeterAddress(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('mainsEnergyMeterAddress'));
  }

  /**
   * Returns which energy types are measured by the mains energy meter
   */
  public get mainsEnergyMeterCaptureType(): Promise<EnergyMeterCaptureType> {
    return new Promise(async (resolve) => {
      const type = await this.modbusConn.getRegister(this.getMappedAddress('mainsEnergyMeterCaptureType'));
      switch (type) {
        case 0:
          resolve(EnergyMeterCaptureType.EverythingIncludingSolar);
          break;
        case 1:
          resolve(EnergyMeterCaptureType.EverythingWithoutSolar);
          break;
      }
    });
  }

  /**
   * Returns the type of the configured solar energy meter
   */
  public get solarEnergyMeterType(): Promise<EnergyMeterType> {
    return new Promise(async (resolve) => {
      const type = await this.modbusConn.getRegister(this.getMappedAddress('solarEnergyMeterType'));
      const meterType = this.interpretMeterType(type);
      resolve(meterType);
    });
  }

  /**
   * Returns the Modbus address of the configured solar energy meter
   */
  public get solarEnergyMeterAddress(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('solarEnergyMeterAddress'));
  }
}
