import { ModbusConnection } from './ModBusConnection';
import AddressMapping from './AddressMapping.json';
import {
  FirmwareVersion,
  State,
  ErrorState,
  Mode,
  ConnectionType,
  CableLockType,
  LoadBalancingConfig,
  ExternalSwitchConfiguration,
  EnergyMeterType
} from './Enums';

export type Config = {
  host: string;
  port?: number;
  fw: FirmwareVersion;
  slaveId?: number;
};

export class SmartEVSE {
  private config: Config;
  private modbusConn: ModbusConnection;

  /**
   * Do not create a Smart EVSE object directly. Instead use the static 'connect' method.
   */
  private constructor(opts: Config) {
    this.config = opts;
  }

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
    const defaultSlaveID = smartEVSE.config.fw == FirmwareVersion['New'] || smartEVSE.config.fw === undefined ? 1 : 0;
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

  /**
   * Translates the name of value to a modbus address taking in to account the FW version (addresses are different between FW versions)
   * @param {string} name Address name
   */
  private getMappedAddress(name: string): number {
    return AddressMapping[name][this.config.fw] as number;
  }

  // CURRENT VALUES
  // ----------------------------------------------------------------

  /**
   * Returns the current state of the Smart EVSE
   * @todo Can be combined with errorState?
   */
  public get state(): Promise<State> {
    return new Promise(async (resolve) => {
      const state = await this.modbusConn.getRegister(this.getMappedAddress('currentState'));
      const stateCode = String.fromCharCode(state);
      switch (stateCode) {
        case 'A':
          //TODO
          break;
        case 'B':
          resolve(State.Connected);
          break;
        case 'C':
          resolve(State.Charging);
          break;
        case 'D':
          //TODO
          break;
      }
    });
  }

  /**
   * Returns the current error state if one is present
   * @todo Can be combined with state?
   */
  public get errorState(): Promise<ErrorState> {
    return new Promise(async (resolve) => {
      const errorState = await this.modbusConn.getRegister(this.getMappedAddress('errorState'));
      switch (errorState) {
        case 0:
          resolve(ErrorState.None);
          break;
        case 1:
          resolve(ErrorState.Less6A);
          break;
        case 2:
          resolve(ErrorState.NoComm);
          break;
        case 3:
          resolve(ErrorState.TempHigh);
          break;
        case 8:
          resolve(ErrorState.Unused);
          break;
        case 16:
          resolve(ErrorState.RCD);
          break;
        case 32:
          resolve(ErrorState.NoSun);
          break;
      }
    });
  }

  /**
   * Returns the maximum achieved charging current (in this charging session?)
   * @returns {number} Amps
   */
  public get maxChargingCurrent(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('maxChargingCurrent'));
  }

  /**
   * Returns the minimym achieved charging current (in this charging session?)
   * @returns {number} Amps
   */
  public get minChargingCurrent(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('minChargingCurrent'));
  }

  /**
   * Returns the number of used phases (in this charging session?)
   */
  public get usedPhases(): Promise<number> {
    throw Error('Not implemented');
  }

  /**
   * Returns the real current charging current (in this charging session?)
   */
  public get realChargingCurrent(): Promise<number> {
    throw Error('Not implemented');
  }

  /**
   * Returns the current charging current (in this charging session?)
   * @returns {number} Amps
   */
  public get chargingCurrent(): Promise<number> {
    return new Promise(async (resolve) => {
      resolve((await this.modbusConn.getRegister(this.getMappedAddress('chargingCurrent'))) / 10);
    });
  }

  /**
   * Returns ?
   * @returns {boolean} ?
   * @todo Better describe this method/output
   */
  public get access(): Promise<boolean> {
    return new Promise(async (resolve) => {
      resolve((await this.modbusConn.getRegister(this.getMappedAddress('access'))) == 1);
    });
  }

  /**
   * Returns the current mode in which the SmartEVSE operates
   */
  public get mode(): Promise<Mode> {
    return new Promise(async (resolve) => {
      const mode = await this.modbusConn.getRegister(this.getMappedAddress('mode'));
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

  // NODE CONFIGURATION
  // ----------------------------------------------------------------

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
  public get energyMeterType(): Promise<EnergyMeterType> {
    return new Promise(async (resolve) => {
      const type = await this.modbusConn.getRegister(this.getMappedAddress('energyMeterType'));
      switch (type) {
        case 0:
          resolve(EnergyMeterType.Disabled);
          break;
        case 1:
          resolve(EnergyMeterType.Sensorbox);
          break;
        case 2:
          resolve(EnergyMeterType.Phoenix);
          break;
        case 3:
          resolve(EnergyMeterType.Finder);
          break;
        case 4:
          resolve(EnergyMeterType.Eastron);
          break;
        case 5:
          resolve(EnergyMeterType.ABB);
          break;
        case 6:
          resolve(this.config.fw == FirmwareVersion.New ? EnergyMeterType.Solaredge : EnergyMeterType.Custom);
          break;
        case 7: // New FW only
          resolve(EnergyMeterType.Wago);
          break;
        case 8: // New FW only
          resolve(EnergyMeterType.Custom);
          break;
      }
    });
  }

  /**
   * Returns the Modbus address of the configured energy meter
   */
  public get energyMeterAddress(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('energyMeterAddress'));
  }

  // SYSTEM CONFIGURATION
  // ----------------------------------------------------------------

  /**
   * Returns the configured maximum charging current
   * @returns {number} Amps
   */
  public get maxAllowedSystemWideChargingCurrent(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('maxAllowedSystemWideChargingCurrent'));
  }

  /**
   * Configures the maximum charging current
   * @param {number} val Amps
   * @todo To be developed
   */
  public async setMaxAllowedChargingCurrent(val: number): Promise<void> {
    //TODO
    console.log(val);
  }
}
