import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

it('given app when component did mount then component rendered', async () => {
  fetch.mockReject(new Error('Nope!'));
  const app = mount(<App />);

  await new Promise(setTimeout);
  app.update();

  expect(app).toIncludeText('unavailable');
});
