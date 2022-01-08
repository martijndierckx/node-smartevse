import { ModbusConnection } from './ModBusConnection';
import AddressMapping from './AddressMapping.json';

export enum FirmwareVersion {
  '>2.20' = 'new',
  '<=2.20' = 'old'
}

export enum State {
  Connected = 'connected',
  Charging = 'charging'
}

export enum ErrorState {
  None = 'none',
  Less6A = 'less_6A',
  NoComm = 'no_comm',
  TempHigh = 'temp_high',
  Unused = 'unused',
  RCD = 'RCD',
  NoSun = 'no_sun'
}

export enum Mode {
  Normal = 'normal',
  Smart = 'smart',
  Solar = 'solar'
}

export type Config = {
  host: string;
  port?: number;
  fw: FirmwareVersion;
  slaveId?: number;
};

export class SmartEVSE {
  private config: Config;
  private modbusConn: ModbusConnection;

  private constructor(opts: Config) {
    this.config = opts;
  }

  public static async connect(opts: Config) {
    const smartEVSE = new SmartEVSE(opts);

    // Determine Modbus connection config
    const defaultSlaveID = smartEVSE.config.fw == FirmwareVersion['>2.20'] || smartEVSE.config.fw === undefined ? 1 : 0;
    const connOpts = {
      host: smartEVSE.config.host,
      port: smartEVSE.config.port ?? 502,
      slaveId: smartEVSE.config.slaveId !== undefined ? smartEVSE.config.slaveId : defaultSlaveID
    };

    // Connect
    smartEVSE.modbusConn = await ModbusConnection.connect(connOpts);

    return smartEVSE;
  }

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

  // SYSTEM CONFIGURATION
  // ----------------------------------------------------------------

  /**
   * Returns the configured maximum charging current
   * @returns {number} Amps
   */
  public get maxAllowedChargingCurrent(): Promise<number> {
    return this.modbusConn.getRegister(this.getMappedAddress('maxAllowedChargingCurrent'));
  }

  /**
   * Configures the maximum charging current
   * @param {number} val Amps
   * @todo To be developed
   */
  public async setMaxAllowedChargingCurrent(val: number): Promise<void> {
    //TODO
  }
}
