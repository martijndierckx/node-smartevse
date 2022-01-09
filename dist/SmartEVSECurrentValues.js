"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartEVSECurrentValues = void 0;
const Enums_1 = require("./Enums");
const SmartEVSEBase_1 = require("./SmartEVSEBase");
class SmartEVSECurrentValues extends SmartEVSEBase_1.SmartEVSEBase {
    /**
     * Returns the current state of the Smart EVSE
     * @todo Can be combined with errorState?
     * @todo Add missing A & D states
     */
    get state() {
        return new Promise(async (resolve) => {
            const state = await this.modbusConn.getRegister(this.getMappedAddress('currentState'));
            const stateCode = String.fromCharCode(state);
            switch (stateCode) {
                case 'A':
                    //TODO
                    break;
                case 'B':
                    resolve(Enums_1.State.Connected);
                    break;
                case 'C':
                    resolve(Enums_1.State.Charging);
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
    get errorState() {
        return new Promise(async (resolve) => {
            const errorState = await this.modbusConn.getRegister(this.getMappedAddress('errorState'));
            switch (errorState) {
                case 0:
                    resolve(Enums_1.ErrorState.None);
                    break;
                case 1:
                    resolve(Enums_1.ErrorState.Less6A);
                    break;
                case 2:
                    resolve(Enums_1.ErrorState.NoComm);
                    break;
                case 3:
                    resolve(Enums_1.ErrorState.TempHigh);
                    break;
                case 8:
                    resolve(Enums_1.ErrorState.Unused);
                    break;
                case 16:
                    resolve(Enums_1.ErrorState.RCD);
                    break;
                case 32:
                    resolve(Enums_1.ErrorState.NoSun);
                    break;
            }
        });
    }
    /**
     * Returns the maximum achieved charging current (in this charging session?)
     * @returns {number} Amps
     */
    get maxChargingCurrent() {
        return this.modbusConn.getRegister(this.getMappedAddress('maxChargingCurrent'));
    }
    /**
     * Returns the minimym achieved charging current (in this charging session?)
     * @returns {number} Amps
     */
    get minChargingCurrent() {
        return this.modbusConn.getRegister(this.getMappedAddress('minChargingCurrent'));
    }
    /**
     * Returns the number of used phases (in this charging session?)
     */
    get usedPhases() {
        throw Error('Not implemented');
    }
    /**
     * Returns the real current charging current (in this charging session?)
     */
    get realChargingCurrent() {
        throw Error('Not implemented');
    }
    /**
     * Returns the current charging current (in this charging session?)
     * @returns {number} Amps
     */
    get chargingCurrent() {
        return new Promise(async (resolve) => {
            resolve((await this.modbusConn.getRegister(this.getMappedAddress('chargingCurrent'))) / 10);
        });
    }
    /**
     * Returns ?
     * @returns {boolean} ?
     * @todo Better describe this method/output
     */
    get access() {
        return new Promise(async (resolve) => {
            resolve((await this.modbusConn.getRegister(this.getMappedAddress('access'))) == 1);
        });
    }
    /**
     * Returns the current mode in which the SmartEVSE operates
     */
    get nodeMode() {
        return new Promise(async (resolve) => {
            const mode = await this.modbusConn.getRegister(this.getMappedAddress('nodeMode'));
            switch (mode) {
                case 0:
                    resolve(Enums_1.Mode.Normal);
                    break;
                case 1:
                    resolve(Enums_1.Mode.Smart);
                    break;
                case 2:
                    resolve(Enums_1.Mode.Solar);
                    break;
            }
        });
    }
}
exports.SmartEVSECurrentValues = SmartEVSECurrentValues;
//# sourceMappingURL=SmartEVSECurrentValues.js.map