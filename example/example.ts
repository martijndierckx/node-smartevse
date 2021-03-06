import SmartEVSE, { FirmwareVersion } from '../src/index';

(async () => {
  const smartEVSE = await SmartEVSE.connect({
    fw: FirmwareVersion.Old,
    host: '192.168.10.38'
  });
  const x = {
    state: await smartEVSE.state,
    current: await smartEVSE.chargingCurrent,
    max: await smartEVSE.maxChargingCurrent,
    externalSwitchConfiguration: await smartEVSE.externalSwitchConfiguration,
    meterType: await smartEVSE.mainsEnergyMeterType
  };
  console.log(x);

  await smartEVSE.disconnect();
})();
