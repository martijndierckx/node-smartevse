import SmartEVSE, { FirmwareVersion } from '../index';

(async () => {
  const smartEVSE = await SmartEVSE.connect({
    fw: FirmwareVersion.Old,
    host: '192.168.10.38'
  });
  const x = {
    state: await smartEVSE.state,
    current: await smartEVSE.chargingCurrent,
    max: await smartEVSE.maxChargingCurrent,
    externalSwitchConfiguration: await smartEVSE.externalSwitchConfiguration
  };
  console.log(x);

  await smartEVSE.disconnect();
})();
