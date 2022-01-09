import { Mode, SensorboxGridType } from './Enums';
import { SmartEVSEBase } from './SmartEVSEBase';
export declare class SmartEVSESystemConfiguration extends SmartEVSEBase {
    /**
     * Returns the configured maximum charging current
     * @returns {number} Amps
     */
    get maxAllowedSystemWideChargingCurrent(): Promise<number>;
    /**
     * Configures the maximum system wide charging current
     * @param {number} val Amps
     * @todo To be developed
     */
    setMaxAllowedSystemWideChargingCurrent(val: number): Promise<void>;
    /**
     * Returns the current mode in which all SmartEVSE nodes operate
     */
    get systemMode(): Promise<Mode>;
    /**
     * Returns the configured maximum mains current
     * @returns {number} Amps
     */
    get maxMainsCurrent(): Promise<number>;
    /**
     * Returns the configured sensorbox grid type
     */
    get sensorboxGridType(): Promise<SensorboxGridType>;
    /**
     * Returns CT calibration multiplier
     * @returns {number}
     */
    get ctCalibrationMultiplier(): Promise<number>;
}
