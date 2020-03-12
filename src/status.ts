import { ITorrentStatus } from "./transmission";

/**
 * all api just return json , but if deeply use the status data
 * init this class from return result
 * it supplies much more functions
 */
export class TorrentStatus implements ITorrentStatus {

  public static showTimeLast(minutes:number) : string {
    if (minutes <= 60 ) {
      return `${minutes} mins`
    } else if (minutes <= 24 * 60) {
      return `${(minutes / 60).toFixed(1)} hours`
    } else {
      return `${(minutes / 60 / 24).toFixed(1)} days`;
    }
  }

  public id?: number;
  public name?: string;
  public percentDone?: number;
  public dateCreated?: number;
  public downloadDir?: string;
  public addedDate?: number;
  public rateDownload?: number;
  public rateUpload?: number
  public uploadRatio?: number;
  public files?: any[];
  public hashString?: string;
  public activityDate?: number;
  public totalSize?: number;
  public downloadedEver?: number;
  public uploadedEver?: number;

  constructor(parms:ITorrentStatus) {
    this.id = parms.id
    this.name = parms.name
    this.addedDate = parms.addedDate
    this.percentDone = parms.percentDone
    this.dateCreated = parms.dateCreated
    this.downloadDir = parms.downloadDir
    this.rateDownload = parms.rateDownload
    this.rateUpload = parms.rateUpload
    this.uploadRatio = parms.uploadRatio
    this.files = parms.files
    this.hashString = parms.hashString
    this.activityDate = parms.activityDate
    this.totalSize = parms.totalSize
    this.downloadedEver = parms.downloadedEver
    this.uploadedEver = parms.uploadedEver
  }

  public isCompleted():boolean {
    return !!(this.percentDone && this.percentDone >= 1)
  }

  /**
   * from add to now, in minutes
   * return -1 if any invalid situation
   */
  public lastInMinutes() :number {
    return this._calLastMinutes(this.addedDate)
  }

  /**
   * the deactive last in minutes
   * TODO make sure the column is deactive
   * means no download and no upload ??
   * return -1  if invalid
   */
  public lastDeactiveInMinutes() :number {
    return this._calLastMinutes(this.activityDate)
  }

  public lastFromOriginCreate() :number {
    return this._calLastMinutes(this.dateCreated)
  }

  protected _calLastMinutes(startTSSeconds?:number):number {
    if (!startTSSeconds) {
      return -1
    } else {
      return Math.round((new Date().getTime()/1000 - startTSSeconds) / 60)
    }
  }
}
