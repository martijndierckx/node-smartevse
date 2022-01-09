# SmartEVSE
A nodejs package  which allows reading values from, and configuring SmartEVSE's over Modbus TCP

[![npm](https://badgen.net/npm/v/smartevse)](https://www.npmjs.com/package/smartevse)

## Install
```npm i --save smartevse``` 

## Example
```javascript
import SmartEVSE, { FirmwareVersion } from 'smartevse';

const smartEVSE = await SmartEVSE.connect({
  fw: FirmwareVersion.Old,
  host: '192.168.0.100'
});
const values = {
  state: await smartEVSE.state,
  current: await smartEVSE.chargingCurrent
};
console.log(values);

await smartEVSE.disconnect();
```

## Typescript & IntelliSense
Use a proper code editor like Visual Studio Code which will help you with IntelliSense & inline documentation.

## Hardware requirements
Requires a Modbus TCP connection to your SmartEVSE.
If you are in the market for a cheap Modbus TCP gateway, have a look at this one:
https://www.aliexpress.com/item/4001292376481.html

In theory, a direct RS485 connection should also be feasible to implement. You are welcome to contribute it in the [jsmodbus](https://github.com/Cloud-Automation/node-modbus) dependency :-)

Tested with a single SmartEVSE on FW 2.20 together with an SDM630