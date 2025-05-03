import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import Axios from 'axios';

const CancelToken = Axios.CancelToken;
const source = CancelToken.source();

Axios.defaults.withCredentials = true;
Axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

export const service_chatbot_conf = {
  protocol: 'https',
  baseUrl: 'app.dev.myapi.tech',
  name: 'Chatbot',
  apiVersion: 1
};

export const DEFAULT_REQ_OPTS = {
  noSocietyHeader: false,
  noToken: false,
  noSocietyPwd: false
};

export const getReqHeaders = (_reqOpts = DEFAULT_REQ_OPTS, headers = {}) => {
  const newHeaders = headers;

  return newHeaders;
};

export const prepareRequest =
  ({ noSocietyHeader = false, noToken = false, noSocietyPwd = false }) =>
  (
    route: string,
    method: string,
    payload: object,
    data: object,
    { opts = {}, headers = {}, ...customParams }
  ) => {
    const reqOpts = {
      noSocietyHeader,
      noToken,
      noSocietyPwd,
      ...opts
    };

    const req: AxiosRequestConfig = {
      url: route,
      method,
      params: payload,
      headers: {
        ...headers
      },
      ...customParams,
      cancelToken: source.token
    };

    if (data) {
      req.data = data;
    }

    req.headers = getReqHeaders(reqOpts, req.headers);

    return req;
  };

const generateApiCallDo = (
  instance: AxiosInstance,
  opts = DEFAULT_REQ_OPTS,
  shouldTrackPromise = false
) => {
  return (
    route: string,
    method = 'get',
    payload = {},
    data = method === 'delete' ? undefined : {},
    { ...customParams } = {},
    noSocietyHeader = false,
    _preventThrowError = false,
    _stopAndReturn = false
  ) => {
    const req = prepareRequest({ ...opts, noSocietyHeader })(
      route,
      method,
      payload,
      data,
      { ...customParams }
    );

    const _wholeRequest = {
      instance,
      opts,
      shouldTrackPromise,
      route,
      method,
      payload,
      data,
      customParams,
      noSocietyHeader,
      req
    };
    const _isNeededToDoSecondCall = false;
   
    const promise = instance.request(req);
    const _requestTime = new Date().getTime();
    return promise;
   
  };
};

function getEndUrlIfPort(port = '') {
  return `:${port}`;
}

export function getBaseUrl({ protocol = 'http', baseUrl = '', port = '' }) {
  if (!protocol || !baseUrl) {
    throw new Error('You cannot have a service without protocol or baseURL');
  }

  return `${protocol}://${baseUrl}${getEndUrlIfPort(port)}`;
}

export function generateConfig(service = {}, sufix = '', opts = {}) {
  return {
    baseURL: `${getBaseUrl(service)}${sufix}`,
    ...opts
  };
}

const serviceChatbotInstance = Axios.create(
  generateConfig(service_chatbot_conf, '/api/v1/starfleet')
);

export function generateApiCall(
  instance = serviceChatbotInstance,
  opts = DEFAULT_REQ_OPTS,
  shouldTrackPromise = false
) {
  return generateApiCallDo(instance, opts, shouldTrackPromise);
}

export const serviceChatbot = {
  makeApiCall: generateApiCall(serviceChatbotInstance, {
    ...DEFAULT_REQ_OPTS,
    noSocietyPwd: true,
    noSocietyHeader: true
  })
};
