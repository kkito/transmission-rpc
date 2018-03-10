import axios from 'axios';

export interface ITransmissionOptions {
  host?: string,
  port?: number,
  path?: string
}

export class Transmission {
  private options: ITransmissionOptions = {
    host: 'localhost',
    path: '/transmission/rpc',
    port: 9091,
  }

  constructor(options?: ITransmissionOptions) {
    if (options) {
      if (options.host) {
        this.options.host = options.host;
      }
      if (options.port) {
        this.options.port = options.port;
      }
      if (options.path) {
        this.options.path = options.path;
      }
    }
  }

  public async getToken(): Promise<string> {
    try {
      const response = await axios.get(this.requestURL());
      return response.headers['X-Transmission-Session-Id'];
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(err.response.headers);
      return err.response.headers['x-transmission-session-id']
    }
  }

  public async getTorrents(): Promise<string> {
    const data = {
      "arguments": { "fields": ["id"] },
      "method": "torrent-get",
    };
    try {

      const response = await axios.post(this.requestURL(), data, {
        headers: {
          'X-Transmission-Session-Id': "7616s7TK2AvL4qe17CCRXMihGhsjsSTQumcQrjhs1d9YkFwX"
        }
      });
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e.response);
      return "error";
    }
  }

  // curl -v 'http://192.168.123.36:9091/transmission/rpc'
  // curl -v -H "X-Transmission-Session-Id: 7616s7TK2AvL4qe17CCRXMihGhsjsSTQumcQrjhs1d9YkFwX" -d '{"method":"session-get"}' 'http://192.168.123.36:9091/transmission/rpc'
  // -d '{ "method":"torrent-get" , "arguments": {"fields": ["id"]} }'

  public printOptions() {
    // tslint:disable-next-line:no-console
    console.log(this.options);
  }

  private requestURL(): string {
    return `http://${this.options.host}:${this.options.port}${this.options.path}`;
  }
}
