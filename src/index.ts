import RingCentral from '@rc-ex/core';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER,
});

rc.token = {
  access_token: process.env.RINGCENTRAL_ACCESS_TOKEN,
};

(async () => {
  const ext = await rc.restapi().account().extension().get();
  console.log(JSON.stringify(ext, null, 2));
})();
