import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '10s', target: 50 },
    { duration: '5s', target: 100 },
    { duration: '10s', target: 100 },
    { duration: '5s', target: 300 },
    { duration: '10s', target: 300 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500']
  },
};

const BASE_URL = 'https://kelicia91.kro.kr/';

export default function ()  {
    let mainResponse = http.get(`${BASE_URL}`);
    check(mainResponse, {
        'load main page': response => response.status === 200
    });

    sleep(1);
};