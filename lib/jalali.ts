const GREGORIAN_MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isGregorianLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

export function gregorianToJalali(year: number, month: number, day: number) {
  let gy = year - 1600;
  const gm = month - 1;
  const gd = day - 1;

  let dayNumber =
    365 * gy +
    Math.floor((gy + 3) / 4) -
    Math.floor((gy + 99) / 100) +
    Math.floor((gy + 399) / 400);

  for (let index = 0; index < gm; index += 1) {
    dayNumber += GREGORIAN_MONTH_DAYS[index];
  }
  if (gm > 1 && isGregorianLeapYear(year)) dayNumber += 1;
  dayNumber += gd;

  let jalaliDayNumber = dayNumber - 79;
  const cycle = Math.floor(jalaliDayNumber / 12053);
  jalaliDayNumber %= 12053;

  let jy = 979 + 33 * cycle + 4 * Math.floor(jalaliDayNumber / 1461);
  jalaliDayNumber %= 1461;

  if (jalaliDayNumber >= 366) {
    jy += Math.floor((jalaliDayNumber - 1) / 365);
    jalaliDayNumber = (jalaliDayNumber - 1) % 365;
  }

  const jalaliMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  let jm = 0;
  while (jm < 11 && jalaliDayNumber >= jalaliMonthDays[jm]) {
    jalaliDayNumber -= jalaliMonthDays[jm];
    jm += 1;
  }

  return { year: jy, month: jm + 1, day: jalaliDayNumber + 1 };
}

export function jalaliToGregorian(year: number, month: number, day: number) {
  let jy = year - 979;
  const jm = month - 1;
  const jd = day - 1;

  let dayNumber =
    365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);
  for (let index = 0; index < jm; index += 1) {
    dayNumber += index < 6 ? 31 : 30;
  }
  dayNumber += jd + 79;

  let gy = 1600 + 400 * Math.floor(dayNumber / 146097);
  dayNumber %= 146097;

  if (dayNumber >= 36525) {
    dayNumber -= 1;
    gy += 100 * Math.floor(dayNumber / 36524);
    dayNumber %= 36524;
    if (dayNumber >= 365) dayNumber += 1;
  }

  gy += 4 * Math.floor(dayNumber / 1461);
  dayNumber %= 1461;

  if (dayNumber >= 366) {
    gy += Math.floor((dayNumber - 1) / 365);
    dayNumber = (dayNumber - 1) % 365;
  }

  let gm = 0;
  while (gm < 11) {
    const daysInMonth =
      gm === 1 && isGregorianLeapYear(gy)
        ? 29
        : GREGORIAN_MONTH_DAYS[gm];
    if (dayNumber < daysInMonth) break;
    dayNumber -= daysInMonth;
    gm += 1;
  }

  return { year: gy, month: gm + 1, day: dayNumber + 1 };
}

export function getTodayJalali() {
  const now = new Date();
  const tehran = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const parts = Object.fromEntries(
    tehran
      .formatToParts(now)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );

  return formatJalali(gregorianToJalali(parts.year, parts.month, parts.day));
}

export function formatJalali(date: { year: number; month: number; day: number }) {
  return `${date.year}/${String(date.month).padStart(2, "0")}/${String(date.day).padStart(2, "0")}`;
}

export function jalaliInputToGregorian(value: string) {
  const match = toLatinDigits(value.trim()).match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (!match) return null;

  const jalali = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
  if (jalali.month < 1 || jalali.month > 12 || jalali.day < 1 || jalali.day > 31) {
    return null;
  }

  const gregorian = jalaliToGregorian(jalali.year, jalali.month, jalali.day);
  const roundTrip = gregorianToJalali(
    gregorian.year,
    gregorian.month,
    gregorian.day,
  );
  if (
    roundTrip.year !== jalali.year ||
    roundTrip.month !== jalali.month ||
    roundTrip.day !== jalali.day
  ) {
    return null;
  }

  return `${gregorian.year}-${String(gregorian.month).padStart(2, "0")}-${String(gregorian.day).padStart(2, "0")}`;
}
