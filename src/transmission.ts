import axios from 'axios';
import * as fs from 'fs';

export interface ITransmissionOptions {
  host?: string,
  port?: number,
  path?: string
}

export class Transmission {
  public static readonly SessionHeader = 'X-Transmission-Session-Id';
  private sessionToken: string | null = null;

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
    if (this.sessionToken) {
      return this.sessionToken;
    }
    try {
      const response = await axios.get(this.requestURL());
      return response.headers[Transmission.SessionHeader];
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(err.response.headers);
      this.sessionToken = err.response.headers[Transmission.SessionHeader.toLowerCase()];
      if (this.sessionToken) {
        return this.sessionToken;
      } else {
        throw new Error(`get session token fail`);
      }
    }
  }

  public async rpcCall(method: string, args: any):Promise<object> {
    const data = {
      "arguments": args,
      "method": method,
    }
    try {
      const token = await this.getToken();
      const headers: any = {};
      headers[Transmission.SessionHeader] = token;
      const response = await axios.post(this.requestURL(), data, {
        headers
      });
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e.response);
      return {status: "error"};
    }
  }

  public async getTorrents(): Promise<object> {
    return this.rpcCall('torrent-get', {
      fields: ['id', 'name', 'percentDone', 'dateCreated']
    })
  }

  public async getTorrentInfo(torrentId: number): Promise<any> {
    return this.rpcCall('torrent-get', {
      fields: ['id', 'name', 'percentDone', 'dateCreated'],
      ids: [torrentId],
    })
  }

  // 返回值 { arguments: { 'torrent-added': { hashString: '56889108e64f2ff82882bb4b6aec3fe47f2b34fd', id: 6, name: '524' } }, result: 'success' }
  public async startTorrent(torrentFile: string): Promise<object> {
    return this.startTorrentByBuffer(fs.readFileSync(torrentFile));
  }

  public async startTorrentByBuffer(torrent:Buffer): Promise<object> {
    const response = await this.rpcCall('torrent-add', {
      metainfo: torrent.toString('base64')
    })
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(response));
    // tslint:disable-next-line:no-empty
    return response;
  }

  public async removeTorrent(torrentId: number, deleteLocalData = false): Promise<object> {
    return this.rpcCall('torrent-remove', {
      "delete-local-data": deleteLocalData,
      ids: [torrentId],
    })
  }

  /*
  public async removeTorrent(torrentId:string) {

  }
  */

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
