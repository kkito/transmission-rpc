import { TorrentStatus } from "../src/status";
test('init', () => {
  const status = new TorrentStatus({
    activityDate: 1583887464,
    addedDate: 1583678832,
    dateCreated: 1583077927,
    hashString: 'f8ee5f21b49381209d6437726e50cc31bab8b227',
    id: 127,
    name: 'testName',
    percentDone: 0.1939,
    rateDownload: 0,
    rateUpload: 0,
    uploadRatio: 1.0626,
  })

  expect(status.isCompleted()).toBeFalsy()
  expect(status.lastInMinutes()).toBeGreaterThan(2000)
  expect(status.lastDeactiveInMinutes()).toBeGreaterThan(0)
  expect(status.lastFromOriginCreate()).toBeGreaterThan(2000)
  // tslint:disable-next-line:no-console
  // console.log(status.lastFromOriginCreate())
})


test('showTimeLast', () => {
  let result = TorrentStatus.showTimeLast(6)
  expect(result).toEqual('6 mins')
  result = TorrentStatus.showTimeLast(69)
  expect(result).toEqual('1.1 hours')
  result = TorrentStatus.showTimeLast(1201)
  expect(result).toEqual('20.0 hours')
  result = TorrentStatus.showTimeLast(1501)
  expect(result).toEqual('1.0 days')
  result = TorrentStatus.showTimeLast(6900)
  expect(result).toEqual('4.8 days')
})
