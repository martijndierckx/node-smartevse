export enum FirmwareVersion {
  New = '>2.20',
  Old = '<=2.20'
}

export enum State {
  Connected = 'connected',
  Charging = 'charging'
}

export enum ErrorState {
  None = 'none',
  Less6A = 'less-6A',
  NoComm = 'no-comm',
  TempHigh = 'temp-high',
  Unused = 'unused',
  RCD = 'RCD',
  NoSun = 'no-sun'
}

export enum Mode {
  Normal = 'normal',
  Smart = 'smart',
  Solar = 'solar'
}

export enum ConnectionType {
  Socket = 'socket',
  FixedCable = 'cable'
}

export enum CableLockType {
  Disabled = 'disabled',
  Solenoid = 'solenoid',
  Motor = 'motor'
}

export enum LoadBalancingConfig {
  Disabled = 'disabled',
  Master = 'master',
  Node1 = 'node1',
  Node2 = 'node2',
  Node3 = 'node3',
  Node4 = 'node4', // Only possible on > FW 2.20
  Node5 = 'node5', // Only possible on > FW 2.20
  Node6 = 'node6', // Only possible on > FW 2.20
  Node7 = 'node7' // Only possible on > FW 2.20
}

export enum ExternalSwitchConfiguration {
  Disabled = 'disabled',
  AccessPushButton = 'access-push-button',
  AccessSwitch = 'access-switch',
  SmartSolarPushButton = 'smart-solar-push-button',
  SmartSolarSwitch = 'smart-solar-switch'
}

export enum EnergyMeterType {
  Disabled = 'disabled',
  Sensorbox = 'sensorbox',
  Finder = 'finder',
  Eastron = 'eastron',
  ABB = 'abb',
  Solaredge = 'solaredge',
  Wago = 'wago',
  Phoenix = 'phoenix',
  Custom = 'custom'
}

export enum SensorboxGridType {
  FourWire = 4,
  ThreeWire = 3
}

export enum EnergyMeterCaptureType {
  EverythingIncludingSolar = 'mains+evse+pv',
  EverythingWithoutSolar = 'mains+evse'
}