import { ConnectionType, LoadBalancingConfig, CableLockType, ExternalSwitchConfiguration, EnergyMeterType } from "./Enums";
import { SmartEVSEBase } from "./SmartEVSEBase";

export class SmartEVSENodeConfiguration extends SmartEVSEBase {
  /**
   * Returns the way the charging cable is connected to the Smart EVSE
   */
   public get connectionType(): Promise<ConnectionType> {
    return new Promise(async (resolve) => {
      const connType = await this.modbusConn.getRegister(this.getMappedAddress('connectionType'));
      switch (connType) {
        case 0:
          resolve(ConnectionType.Socket);
          break;
        case 1:
          resolve(ConnectionType.FixedCable);
          break;
      }
    });
  }

  /**
   * Returns the load balancing configuration of the Smart EVSE
   */
  public get loadBalancingConfig(): Promise<LoadBalancingConfig> {
    return new Promise(async (resolve) => {
      const config = await this.modbusConn.getRegister(this.getMappedAddress('loadBalancingConfig'));
      switch (config) {
        case 0:
          resolve(LoadBalancingConfig.Disabled);
          break;
        case 1:
          resolve(LoadBalancingConfig.Master);
          break;
        case 2:
          resolve(LoadBalancingConfig.Node1);
          break;
        case 3:
          resolve(LoadBalancingConfig.Node2);
          break;
        case 4:
          resolve(LoadBalancingConfig.Node3);
          break;
        case 5:
          resolve(LoadBalancingConfig.Node4);
          break;
        case 6:
          resolve(LoadBalancingConfig.Node5);
          break;
        case 7:
          resolve(LoadBalancingConfig.Node6);
          break;
        case 7:
          resolve(LoadBalancingConfig.Node7);
          break;
      }
    });
  }

  /**
   * Returns the configured minimum accepted charging current by the vehicle
   * @returns {number} Amps
   */
  public get minAcceptedChargingCurrent(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('minAcceptedChargingCurrent'));
  }

  /**
   * Returns the configured maximum accepted charging current by the vehicle
   * @returns {number} Amps
   */
  public get maxAcceptedChargingCurrent(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('maxAcceptedChargingCurrent'));
  }

  /**
   * Returns the way the charging cable is connected to the Smart EVSE
   */
  public get cableLockType(): Promise<CableLockType> {
    return new Promise(async (resolve) => {
      const connType = await this.modbusConn.getRegister(this.getMappedAddress('cableLockType'));
      switch (connType) {
        case 0:
          resolve(CableLockType.Disabled);
          break;
        case 1:
          resolve(CableLockType.Solenoid);
          break;
        case 2:
          resolve(CableLockType.Motor);
          break;
      }
    });
  }

  /**
   * Returns the configured maximum accepted charging current by the vehicle
   * @returns {number} Amps
   */
  public get startChargingAtSurplusSolarCurrent(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('startChargingAtSurplusSolarCurrent'));
  }

  /**
   * Returns the configured solar charging time at 6 Amps
   * @returns {number} mins (0: Disabled)
   */
  public get stopSolarChargingAt6AmpsAfter(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('stopSolarChargingAt6AmpsAfter'));
  }

  /**
   * Returns the configuration for the external switch
   */
  public get externalSwitchConfiguration(): Promise<ExternalSwitchConfiguration> {
    return new Promise(async (resolve) => {
      const config = await this.modbusConn.getRegister(this.getMappedAddress('externalSwitchConfiguration'));
      switch (config) {
        case 0:
          resolve(ExternalSwitchConfiguration.Disabled);
          break;
        case 1:
          resolve(ExternalSwitchConfiguration.AccessPushButton);
          break;
        case 2:
          resolve(ExternalSwitchConfiguration.AccessSwitch);
          break;
        case 3:
          resolve(ExternalSwitchConfiguration.SmartSolarPushButton);
          break;
        case 4:
          resolve(ExternalSwitchConfiguration.SmartSolarSwitch);
          break;
      }
    });
  }

  /**
   * Returns whether a Residual Current Monitor has been configured
   */
  public get residualCurrentMonitorEnabled(): Promise<boolean> {
    return new Promise(async (resolve) => {
      resolve((await this.modbusConn.getRegister(this.getMappedAddress('residualCurrentMonitorEnabled'))) == 1);
    });
  }

  /**
   * Returns how much grid power (A) is allowed when solar charging
   */
  public get allowedGridPowerWhenSolarCharging(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('allowedGridPowerWhenSolarCharging'));
  }

  /**
   * Returns whether an RFID reader has been configured
   */
  public get rfidReaderEnabled(): Promise<boolean> {
    return new Promise(async (resolve) => {
      resolve((await this.modbusConn.getRegister(this.getMappedAddress('rfidReaderEnabled'))) == 1);
    });
  }

  /**
   * Returns the type of the configured energy meter
   */
  public get vehicleEnergyMeterType(): Promise<EnergyMeterType> {
    return new Promise(async (resolve) => {
      const type = await this.modbusConn.getRegister(this.getMappedAddress('vehicleEnergyMeterType'));
      const meterType = this.interpretMeterType(type);
      resolve(meterType);
    });
  }

  /**
   * Returns the Modbus address of the configured energy meter
   */
  public get vehicleEnergyMeterAddress(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('energyMeterAddress'));
  }
}