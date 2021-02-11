import RingCentral from '@rc-ex/core';
import fs from 'fs';
import path from 'path';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER,
});

rc.token = {
  access_token: process.env.RINGCENTRAL_ACCESS_TOKEN,
};

(async () => {
  const callLog = await rc
    .restapi()
    .account()
    .extension()
    .callLog(process.env.RINGCENTRAL_CALL_LOG_ID)
    .get();
  console.log(JSON.stringify(callLog, null, 2));

  const r = await rc.get<Buffer>(callLog.recording!.contentUri!, undefined, {
    responseType: 'arraybuffer',
  });
  fs.writeFileSync(path.join(__dirname, 'recording.wav'), r.data);
})();
