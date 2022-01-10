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

## Firmware versions
FW 2.30 introduced a new set of Modbus addresses for the different registers. This package supports both the old set (<=2.20) and the new set (>2.20).
We'll default to the new set, so if you are using a SmartEVSE on FW 2.20, it's important to provide the 'old' FW version when setting up the connection.

## Typescript & IntelliSense
Use a proper code editor like Visual Studio Code which will help you with IntelliSense & inline documentation.

## Hardware requirements
Requires a Modbus TCP connection to your SmartEVSE.
If you are in the market for a cheap Modbus TCP gateway, have a look at the Protoss PE11/PW11:
https://www.aliexpress.com/item/4001292376481.html

In theory, a direct RS485 connection should also be feasible to implement. You are welcome to contribute it in the [jsmodbus](https://github.com/Cloud-Automation/node-modbus) dependency :-)

## Modbus gateway configuration
### Serial port settings
- Baud rate = 9600
- Data bits = 8
- Stop bits = 1
- Parity = None
- Protocol: Modbus (at the bottom on the PE11/PW11)

The PE11/PW11 offers some other settings as well on the 'serial port' side. These can be left default:
- Buffer size: 512
- Gap time: 50
- Flow control: Disable
- CLI: disable

### Communication settings
- Type: TCP
- Port: 502 (if you set a different port, make sure to configure it in the settings of this package)

## Credits

Thanks [bobosch](https://github.com/bobosch) & [mstegen](https://github.com/mstegen) for the beautiful work on [SmartEVSE](https://github.com/SmartEVSE/SmartEVSE-2)

This package is provided as a small hobby project. Once everything is up and running in my setup at home, my motivation to maintain this repo might drop, so contributions are very welcome!

Tested with a single SmartEVSE on FW 2.20 together with an SDM630 kWh meter, connected via a PE11-H Modbus gateway.