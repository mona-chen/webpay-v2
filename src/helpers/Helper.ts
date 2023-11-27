/* eslint-disable no-useless-concat */

import { renderToStaticMarkup } from "react-dom/server";
// import { logger } from '../../services/logger';
// import { stringSimilarity } from "string-similarity";

export const reactSelectStyle = {
  control: (base: any, state: { isFocused: any }) => ({
    ...base,
    border: state.isFocused ? "0.1rem solid #6F6F6F" : "0.1rem solid #6F6F6F",
    // backgroundColor: state.isSelected ? "#6F6F6F" : "white",
    boxShadow: state.isFocused ? "0.1rem solid #6F6F6F" : 0,
    "&:hover": {
      // border: state.isFocused ? 0 : 0
    },
  }),
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "rgba(204, 204, 204, .3)" : "white",
    color: state.isSelected ? "#020202" : "#020202",
  }),
};

export const formatNumWithoutCommaNaira = (number: any) => {
  // const nairaSymbol = "\u{020A6}";

  var regex = /[,\sN#%₦G]/g;
  var result = String(number).replace(regex, "");
  return result;
};

export const formatNumWithCommaNaira = (number: any) => {
  var regex = /[,\sNG]/g;
  var result = String(number).replace(regex, "");
  var num = Math.abs(Number(result));
  num = Number(num.toFixed(2));
  const numSplit = num.toString().split(".");
  var int = numSplit[0];
  const dec = numSplit[1];
  if (int.length > 3) {
    int = int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (number) {
    return int + "." + dec;
  }

  return "0" + "." + "00";
};

export const formatNumWithCommaNairaSymbol = (number: any) => {
  const nairaSymbol = "\u{020A6}";

  var regex = /[,\sNG]/g;
  var result = String(number).replace(regex, "");
  var num = Math.abs(Number(result));
  num = Number(num.toFixed(2));
  const numSplit = num.toString().split(".");
  var int = numSplit[0];
  const dec = numSplit[1];
  if (int.length > 3) {
    int = int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (number) {
    return nairaSymbol + "" + int + "." + dec;
  }

  return nairaSymbol + "" + "0" + "." + "00";
};

export const formatNumWithComma = (
  number: string | number,
  curr?: string | undefined,
  points?: number | undefined
) => {
  if (typeof number === "string") {
    number = parseFloat(number);
  }

  if (!curr) {
    if (number >= 1e6) {
      // Format number in millions (M)
      return (
        (number / 1e6)
          .toFixed(points ?? 1)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
      );
    } else if (number >= 1e3) {
      // Format number in thousands (k)
      return (
        (number / 1e3)
          .toFixed(points ?? 1)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
      );
    } else {
      return number?.toLocaleString(); // Add commas to numbers with less than 1 thousand
    }
  } else {
    const regex = /[,\sNG]/g;
    const result = String(number).replace(regex, "");
    const num = Math.abs(Number(result));
    const numSplit = num.toFixed(2).split(".");
    let int = numSplit[0];
    const dec = numSplit[1];

    if (int.length > 3) {
      int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (number) {
      return int + "." + dec;
    }

    return "0";
  }
};

export const getTotalPage = (perpage: any, totalNum: any) => {
  const val = Math.ceil(Number(totalNum) / Number(perpage));
  // logger.log(val);
  return val;
};

export const generateReference = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

export function formatDate(date: Date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export function numberFormatChart(num: number, digits: number | undefined) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "Q" },
    { value: 1e18, symbol: "QT" },
    { value: 1e21, symbol: "QQ" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  if (item && item.symbol === "M") {
    // const formattedNum = (num / item.value).toFixed(digits);
    // const integerPart = formattedNum.split(".")[0];
    // const decimalPart = formattedNum.split(".")[1];
    // return `${integerPart}.${decimalPart}${item.symbol}`;
  }
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export const formatMetaData = (obj: string) => {
  if (obj) {
    const newObj = JSON?.parse(obj);
    // logger.log(newObj);
    return newObj;
  }
};

export const getPageNum = (link: string) => {
  if (link) {
    const num = link?.split("&current_page=")[1]?.split("&")[0];
    return num;
  }
};

export const sumAllNum = (list: any[]) => {
  if (list) {
    const sumVal = list.reduce((a: any, b: any) => a + b, 0);
    return sumVal;
  }
};

export const removeCountryCode = (num: string) => {
  if (num) {
    const val =
      num.slice(0, 3) === "234"
        ? num.replace("234", "0")
        : num.slice(0, 1) === "0"
        ? num.replace("0", "")
        : num;
    return val;
  }
};

export const capitalizeFirstLetter = (str?: any) => {
  if (str) {
    let capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalizedStr;
  }
};

export const formatStatus = (param?: string | number) => {
  if (param) {
    const val =
      param === "0"
        ? "pending"
        : param === "1"
        ? "processing"
        : param === "2"
        ? "success"
        : param === "3"
        ? "failed"
        : "--";
    return val;
  }
};

export const removeSpace = (str: string) => {
  const val = str.replace(/\s+/g, "");
  // logger.log(val);
  return val;
};

export const trimLongString = (str: string | undefined, num: number) => {
  if (str && num) {
    const val =
      String(str).length > Number(num)
        ? `${String(str).slice(0, Number(num))}...`
        : str;
    return val;
  }
};

export const getPosTerminalRequest = (list: string | any[]) => {
  if (list?.length > 0) {
    const status = list[0]?.status;
    return status;
  }
};

export const formatTitleTemplate = (text: any) => {
  var regex = /[,\s_.csvNG]/g;
  var result = String(text).replace(regex, " ");
  return result;
};

export const formatNUmPan = (str: string | any[]) => {
  if (str) {
    const val = `${str?.slice(0, 6)}******${str?.slice(
      str?.length - 4,
      str?.length
    )}`;
    return val;
  }
};

export const lowerCaseWrap = (text: string) => {
  if (text) {
    const lowerText = text.toLowerCase();
    let capitalizedStr = lowerText
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return capitalizedStr;
  }
};

export const formatTypeFunction = (str: string) => {
  let val;
  if (str) {
    if (!str?.includes("_")) {
      return str;
    }
    const splitStr = str.split("_");
    // logger.log(splitStr);
    if (splitStr.length === 1 && str?.includes("_")) {
      const newText = `${splitStr[0] || ""}`;
      val = lowerCaseWrap(newText);
    }
    if (splitStr.length === 2 && str?.includes("_")) {
      const newText = `${splitStr[0] || ""} ${splitStr[1] || ""}`;
      val = lowerCaseWrap(newText);
    }
    if (splitStr.length === 3 && str?.includes("_")) {
      const newText = `${splitStr[0] || ""} ${splitStr[1] || ""} ${
        splitStr[2] || ""
      }`;
      val = lowerCaseWrap(newText);
    }
    // logger.log(val);
    return val;
  }
};

/**
 *
 * @param {string} key The hot key you want to bind to
 * @param {any} func The function to call when the key is pressed
 * @returns function
 * @description This fn allows you bind child functions to a hot key - basically a key binding function
 */

export const mapHotkey = (key: string, func: any) => {
  const handleKeyDown = (event: { metaKey: any; key: string }) => {
    // Check if Cmd + D is pressed
    if (event.metaKey && event.key === key) {
      func();
    }
  };

  // Add event listener when the component mounts
  window.addEventListener("keydown", handleKeyDown);

  // Clean up the event listener when the component unmounts
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
};

/**
 * A custom implementation of moment date time formater using JavaScript Internalization API.
 * @author Ezeani Emmanuel
 * @param {Date | string} date
 * @returns string
 */
export function formatDateTime(date: Date | string) {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date";
  }

  const options: any = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(parsedDate);
}

/**
 * @name IconVault
 * @description A utility function for converting React icons to data URLs.
 * @author Ezeani Emmanuel
 *
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} icon - The React icon component to convert.
 *
 * @returns {string} The data URL representing the icon.
 *
 * @usage
 * 1. Import the `IconVault` function:
 *    import { IconVault } from './IconVault';
 *
 * 2. Use the `IconVault` function to convert a React icon to a data URL:
 *    const dataUrl = IconVault(icons.arrow_right);
 *
 *    Note: Replace `icons.arrow_right` with your actual React icon component.
 *
 * 3. Use the `dataUrl` in your CSS or inline styles:
 *    background-image: url(dataUrl);
 *
 * @example
 * // Import the required libraries
 * import { renderToStaticMarkup } from 'react-dom/server';
 *
 * // Define the IconVault function
 * const IconVault = (
 *   icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>
 * ) => {
 *   const svgString = renderToStaticMarkup(icon);
 *   const utf8Svg = decodeURIComponent(encodeURIComponent(svgString));
 *   const base64Svg = btoa(utf8Svg);
 *   const dataUrl = `url("data:image/svg+xml;base64,${base64Svg}")`;
 *   return dataUrl;
 * };
 *
 * @notes
 * This utility function converts a React icon component into a data URL
 * that can be used in CSS or inline styles. It encodes the SVG string to
 * base64 format and generates a data URL with the proper MIME type.
 * By using this function, you can easily integrate React icons into your
 * styling workflow.
 *
 * Please note that the function uses the `renderToStaticMarkup` function
 * from the `react-dom/server` module, so make sure to import it before using
 * the `IconVault` function.
 */

export const IconVault = (
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>
): string => {
  const svgString = renderToStaticMarkup(icon);
  const utf8Svg = decodeURIComponent(encodeURIComponent(svgString));
  const base64Svg = btoa(utf8Svg);
  const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;
  return dataUrl;
};

export function symbol(wallet: string) {
  if (wallet === "ngn") {
    return "₦";
  } else if (wallet === "usd") {
    return "$";
  } else if (wallet === "gbp") {
    return "£";
  } else if (wallet === "rf" || wallet === "rwf") {
    return "Fr";
  } else if (wallet === "ksh" || wallet === "khs") {
    return "KSh";
  } else if (wallet === "eur") {
    return "€";
  } else {
    return ""; // Default case if wallet is not recognized
  }
}

export function returnInitial(name: string) {
  if (name) {
    const i = name?.split(" ");
    if (i.length > 1) {
      return i[0]?.slice(0, 1).toUpperCase() + i[1]?.slice(0, 1).toUpperCase();
    } else {
      return i[0]?.slice(0, 1).toUpperCase();
    }
  } else {
    return name?.slice(0, 1).toUpperCase();
  }
}

/**
 *
 * @param key The URL Param Key you want to add to the URL e.g 'search-query' or 'q'
 * @param value The value you want to add to the URL Param Key e.g 'Ezeani Mona'
 * @param title The Page Title e.g 'Search Results for Ezeani Mona'
 * @param preserve_hash set to true to preserve the hash value you want to add to the URL Param Key
 * @usage
 * 1. Import the `insertUrlParam` function:
 *    import { insertUrlParam } from './helper';
 *
 * 2. Use the `insertUrlParam` function to add url parameters to the URL
 *
 * @example
 *  const search = insertUrlParam;
 * <button onclick={() => search('q', 'Mona Lee')}/>
 */
export function insertUrlParam(
  key: string,
  value: string,
  title = "",
  preserve_hash = false
) {
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  let newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?" +
    searchParams.toString();
  if (preserve_hash) newurl = newurl + window.location.hash;
  let oldTitle = document.title;
  if (title !== "") {
    window.history.replaceState({ path: newurl }, title, newurl);
    if (document.title !== title) {
      // fallback if above doesn't work
      document.title = title;
    }
  } else {
    // in case browsers ever clear titles set with empty string
    window.history.replaceState({ path: newurl }, oldTitle, newurl);
  }
}

export function removeUrlParam(key: string, title = "", preserve_hash = false) {
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(key);
  let newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    (searchParams.toString() !== "" ? "?" + searchParams.toString() : "");
  if (preserve_hash) newurl = newurl + window.location.hash;
  let oldTitle = document.title;
  if (title !== "") {
    window.history.replaceState({ path: newurl }, title, newurl);
    if (document.title !== title) {
      // fallback if above doesn't work
      document.title = title;
    }
  } else {
    // in case browsers ever clear titles set with empty string
    window.history.replaceState({ path: newurl }, oldTitle, newurl);
  }
}

export const searchParams: URLSearchParams = new URLSearchParams(
  document.location.search
);

export function removeCommaAndNairaSign(str: string | number) {
  // Remove commas from the string
  const stringWithoutCommas = String(str).replace(/,/g, "");

  // Remove the Nigerian Naira sign (₦) from the string
  const stringWithoutNairaSign = stringWithoutCommas.replace(/₦/g, "");

  // Return the modified string
  return stringWithoutNairaSign;
}

export function cleanseString(input: string) {
  // Use a regular expression to remove non-digit characters
  return input.replace(/[^\d]/g, "");
}
export const handleCopy = (data: string, setState: any, stateValue?: any) => {
  navigator.clipboard.writeText(data);

  setState(stateValue || true);

  setTimeout(() => {
    setState(false);
  }, 1000);
  // You can add any additional logic or feedback here, like showing a tooltip or toast message.
};

export const setCookie = (name: string, value: string, seconds: number) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + seconds * 1000); // Convert seconds to milliseconds

  const cookieValue =
    encodeURIComponent(value) +
    (seconds ? `; expires=${expirationDate.toUTCString()}` : "");

  document.cookie = `${name}=${cookieValue}; path=/`;
};

export function getCookie(name: string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie is the one we're looking for
    if (cookie.startsWith(name + "=")) {
      // Return the value of the cookie
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  // If the cookie is not found, return null
  return null;
}
