const check = document.querySelector("#check");
const inputBirthDate = document.querySelector("#birthday");
const output = document.querySelector("#output");
function strReverse(str) {
  return str.split("").reverse().join("");
}
function dateToString(date) {
  if (date.day < 10) {
    strDay = "0" + date.day;
  } else {
    strDay = date.day.toString();
  }
  if (date.month < 10) {
    strMonth = "0" + date.month;
  } else {
    strMonth = date.month.toString();
  }
  strYear = date.year.toString();
  const strDate = {
    day: strDay,
    month: strMonth,
    year: strYear,
  };
  return strDate;
}

check.addEventListener("click", () => {
  const formatsStr = [
    "ddmmyyyy",
    "mmddyyyy",
    "yyyymmdd",
    "ddmmyy",
    "mmddyy",
    "yymmdd",
  ];
  birthDate = inputBirthDate.value;
  format = "";
  if (inputBirthDate.value == "") {
    output.innerText = "Please enter your date of birth";
  } else {
    const [yyyy, mm, dd] = birthDate.split("-");
    const date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };
    var flag = false;
    var strDate = dateToString(date);
    var list = checkFormatsArePalindromes(strDate);
    flagIsPalindrome = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i]) {
        flagIsPalindrome = true;
        output.innerText = `Your birthday is a palindrome in the format ${formatsStr[i]}`;
        break;
      } else {
        var [numOfNextDays, nextPalindromeDate, formatOfNextDate] =
          getNextPalindrome(date);
        var [numOfPrevDays, previousPalindromeDate, formatOfPrevDate] =
          getPreviousPalindrome(date);
        if (numOfNextDays > numOfPrevDays) {
          printMessage(
            numOfPrevDays,
            previousPalindromeDate,
            formatOfPrevDate,
            formatsStr
          );
        } else {
          printMessage(
            numOfNextDays,
            nextPalindromeDate,
            formatOfNextDate,
            formatsStr
          );
        }
      }
    }
  }
});
function allFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.substring(2, 4);
  var mmddyy = date.month + date.day + date.year.substring(2, 4);
  var yymmdd = date.year.substring(2, 4) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function isPalindrome(str) {
  return str === strReverse(str);
}
function checkFormatsArePalindromes(date) {
  var formats = allFormats(date);
  var results = [];

  for (var i = 0; i < formats.length; i++) {
    results.push(isPalindrome(formats[i]));
  }
  return results;
}
function getNextPalindrome(date) {
  var nextDate = getNextDate(date);
  var counter = 0;
  while (1) {
    counter += 1;
    var strNextDate = dateToString(nextDate);

    var results = checkFormatsArePalindromes(strNextDate);
    for (var i = 0; i < results.length; i++) {
      if (results[i]) {
        return [counter, strNextDate, i];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}
function getNextDate(date) {
  var nextDate = {
    day: date.day + 1,
    month: date.month,
    year: date.year,
  };
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (date.month == 2) {
    if (isLeapyear(nextDate.year)) {
      if (nextDate.day > 29) {
        nextDate.day = 1;
        nextDate.month += 1;
      }
    } else {
      if (nextDate.day > 28) {
        nextDate.day = 1;
        nextDate.month += 1;
      }
    }
  } else {
    if (nextDate.day > days[nextDate.month - 1]) {
      nextDate.day = 1;
      nextDate.month += 1;
    }
  }
  if (nextDate.month > 12) {
    nextDate.month = 1;
    nextDate.year += 1;
  }
  return nextDate;
}
function isLeapyear(year) {
  if (year % 400 == 0) {
    return true;
  }
  if (year % 100 == 0) {
    return false;
  }
  if (year % 4 == 0) {
    return true;
  }
  return false;
}
function getPreviousPalindrome(date) {
  var previousDate = getPreviousDate(date);
  var counter = 0;
  while (1) {
    counter += 1;
    var strPreviousDate = dateToString(previousDate);

    var results = checkFormatsArePalindromes(strPreviousDate);
    for (var i = 0; i < results.length; i++) {
      if (results[i]) {
        return [counter, strPreviousDate, i];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}

function getPreviousDate(date) {
  var previousDate = {
    day: date.day - 1,
    month: date.month,
    year: date.year,
  };

  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (previousDate.day == 0) {
    previousDate.month -= 1;
    if (previousDate.month == 0) {
      previousDate.day = 31;
      previousDate.month = 12;
      previousDate.year -= 1;
    } else if (previousDate.month == 2) {
      if (isLeapyear(previousDate.year)) {
        previousDate.day = 29;
      } else {
        previousDate.day = 28;
      }
    } else {
      previousDate.day = days[previousDate.month - 1];
    }
  }
  return previousDate;
}

function printMessage(days, date, format, formats) {
  output.innerText =
    "Nearest palindrome date is " +
    date.day +
    "-" +
    date.month +
    "-" +
    date.year +
    ` in the format ${formats[format]}` +
    " and you missed by " +
    days +
    " days";
}
