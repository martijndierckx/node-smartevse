import { ErrorState, Mode, State } from './Enums';
import { SmartEVSEBase } from './SmartEVSEBase';

export class SmartEVSECurrentValues extends SmartEVSEBase {
  /**
   * Returns the current state of the Smart EVSE
   * @todo Can be combined with errorState?
   * @todo Add missing A & D states
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
  public get nodeMode(): Promise<Mode> {
    return new Promise(async (resolve) => {
      const mode = await this.modbusConn.getRegister(this.getMappedAddress('nodeMode'));
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
}
