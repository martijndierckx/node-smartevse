export declare enum FirmwareVersion {
    New = ">2.20",
    Old = "<=2.20"
}
export declare enum State {
    Connected = "connected",
    Charging = "charging"
}
export declare enum ErrorState {
    None = "none",
    Less6A = "less-6A",
    NoComm = "no-comm",
    TempHigh = "temp-high",
    Unused = "unused",
    RCD = "RCD",
    NoSun = "no-sun"
}
export declare enum Mode {
    Normal = "normal",
    Smart = "smart",
    Solar = "solar"
}
export declare enum ConnectionType {
    Socket = "socket",
    FixedCable = "cable"
}
export declare enum CableLockType {
    Disabled = "disabled",
    Solenoid = "solenoid",
    Motor = "motor"
}
export declare enum LoadBalancingConfig {
    Disabled = "disabled",
    Master = "master",
    Node1 = "node1",
    Node2 = "node2",
    Node3 = "node3",
    Node4 = "node4",
    Node5 = "node5",
    Node6 = "node6",
    Node7 = "node7"
}
export declare enum ExternalSwitchConfiguration {
    Disabled = "disabled",
    AccessPushButton = "access-push-button",
    AccessSwitch = "access-switch",
    SmartSolarPushButton = "smart-solar-push-button",
    SmartSolarSwitch = "smart-solar-switch"
}
export declare enum EnergyMeterType {
    Disabled = "disabled",
    Sensorbox = "sensorbox",
    Finder = "finder",
    Eastron = "eastron",
    ABB = "abb",
    Solaredge = "solaredge",
    Wago = "wago",
    Phoenix = "phoenix",
    Custom = "custom"
}
export declare enum SensorboxGridType {
    FourWire = 4,
    ThreeWire = 3
}
