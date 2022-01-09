import { EnergyMeterCaptureType, EnergyMeterType, Mode, SensorboxGridType } from './Enums';
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
    /**
     * Returns the type of the configured mains energy meter
     */
    get mainsEnergyMeterType(): Promise<EnergyMeterType>;
    /**
     * Returns the Modbus address of the configured mains energy meter
     */
    get mainsEnergyMeterAddress(): Promise<number>;
    /**
     * Returns which energy types are measured by the mains energy meter
     */
    get mainsEnergyMeterCaptureType(): Promise<EnergyMeterCaptureType>;
    /**
     * Returns the type of the configured solar energy meter
     */
    get solarEnergyMeterType(): Promise<EnergyMeterType>;
    /**
     * Returns the Modbus address of the configured solar energy meter
     */
    get solarEnergyMeterAddress(): Promise<number>;
}
