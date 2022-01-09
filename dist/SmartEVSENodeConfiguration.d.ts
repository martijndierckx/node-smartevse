import { ConnectionType, LoadBalancingConfig, CableLockType, ExternalSwitchConfiguration, EnergyMeterType } from './Enums';
import { SmartEVSEBase } from './SmartEVSEBase';
export declare class SmartEVSENodeConfiguration extends SmartEVSEBase {
    /**
     * Returns the way the charging cable is connected to the Smart EVSE
     */
    get connectionType(): Promise<ConnectionType>;
    /**
     * Returns the load balancing configuration of the Smart EVSE
     */
    get loadBalancingConfig(): Promise<LoadBalancingConfig>;
    /**
     * Returns the configured minimum accepted charging current by the vehicle
     * @returns {number} Amps
     */
    get minAcceptedChargingCurrent(): Promise<number>;
    /**
     * Returns the configured maximum accepted charging current by the vehicle
     * @returns {number} Amps
     */
    get maxAcceptedChargingCurrent(): Promise<number>;
    /**
     * Returns the way the charging cable is connected to the Smart EVSE
     */
    get cableLockType(): Promise<CableLockType>;
    /**
     * Returns the configured maximum accepted charging current by the vehicle
     * @returns {number} Amps
     * Moved to System Configuration in newer FW versions
     */
    get startChargingAtSurplusSolarCurrent(): Promise<number>;
    /**
     * Returns the configured solar charging time at 6 Amps
     * @returns {number} mins (0: Disabled)
     * Moved to System Configuration in newer FW versions
     */
    get stopSolarChargingAt6AmpsAfter(): Promise<number>;
    /**
     * Returns the configuration for the external switch
     */
    get externalSwitchConfiguration(): Promise<ExternalSwitchConfiguration>;
    /**
     * Returns whether a Residual Current Monitor has been configured
     */
    get residualCurrentMonitorEnabled(): Promise<boolean>;
    /**
     * Returns how much grid power (A) is allowed when solar charging
     * @returns {number} Amps
     * Moved to System Configuration in newer FW versions
     */
    get allowedGridPowerWhenSolarCharging(): Promise<number>;
    /**
     * Returns whether an RFID reader has been configured
     */
    get rfidReaderEnabled(): Promise<boolean>;
    /**
     * Returns the type of the configured energy meter
     */
    get vehicleEnergyMeterType(): Promise<EnergyMeterType>;
    /**
     * Returns the Modbus address of the configured energy meter
     */
    get vehicleEnergyMeterAddress(): Promise<number>;
}
