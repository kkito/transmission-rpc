export class Utils {
  public static timestampToLocalDateStr(tz?: number): string {
    if (!tz) {
      return ' ';
    } else {
      // return new Date(tz * 1000).toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})
      // locale and timezone see doc following
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
      const locale = process.env.T_LOCALE || 'en-US';
      const timezone = process.env.T_TZ || 'UTC'; // 'Asia/Shanghai'
      return new Date(tz * 1000).toLocaleString(locale, { timeZone: timezone });
    }
  }

  public static fmtRate(rate?: number): string {
    if (!rate) {
      rate = 0;
    }
    if (rate > 1024 * 1024) {
      return `${Math.round(rate / 1024 / 1024 * 100) / 100}M/s`;
    } else if (rate > 1024) {
      return `${Math.round(rate / 1024 * 100) / 100}k/s`;
    } else {
      return `${rate}B/s`;
    }
  }
}
