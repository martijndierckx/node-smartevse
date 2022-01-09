# node-SmartEVSE
Allows reading values from, and configuring SmartEVSE's over Modbus TCP

## Install
```npm i node-smartevse```

## Example
```
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

## Hardware requirements
Requires a Modbus TCP connection to your SmartEVSE.
If you are in the market for a cheap Modbus TCP gateway, have a look at this one:
https://en.aliexpress.com/item/4001292376481.html

Tested with a single SmartEVSE on FW 2.20 together with an SDM630