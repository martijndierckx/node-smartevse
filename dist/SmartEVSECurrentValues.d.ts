import { ErrorState, Mode, State } from './Enums';
import { SmartEVSEBase } from './SmartEVSEBase';
export declare class SmartEVSECurrentValues extends SmartEVSEBase {
    /**
     * Returns the current state of the Smart EVSE
     * @todo Can be combined with errorState?
     * @todo Add missing A & D states
     */
    get state(): Promise<State>;
    /**
     * Returns the current error state if one is present
     * @todo Can be combined with state?
     */
    get errorState(): Promise<ErrorState>;
    /**
     * Returns the maximum achieved charging current (in this charging session?)
     * @returns {number} Amps
     */
    get maxChargingCurrent(): Promise<number>;
    /**
     * Returns the minimym achieved charging current (in this charging session?)
     * @returns {number} Amps
     */
    get minChargingCurrent(): Promise<number>;
    /**
     * Returns the number of used phases (in this charging session?)
     */
    get usedPhases(): Promise<number>;
    /**
     * Returns the real current charging current (in this charging session?)
     */
    get realChargingCurrent(): Promise<number>;
    /**
     * Returns the current charging current (in this charging session?)
     * @returns {number} Amps
     */
    get chargingCurrent(): Promise<number>;
    /**
     * Returns ?
     * @returns {boolean} ?
     * @todo Better describe this method/output
     */
    get access(): Promise<boolean>;
    /**
     * Returns the current mode in which the SmartEVSE operates
     */
    get nodeMode(): Promise<Mode>;
}
