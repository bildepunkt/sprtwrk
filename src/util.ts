export function assignArgs (obj: object, args: any): void {
  for (var key in args) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = args[key];
    }
  }
}

export function xhrGet (path: string, callback: Function): void {
  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', path, true);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
      callback(JSON.parse(xhr.responseText));
    } else {
      // TODO handle status
    }
  };
  xhr.onerror = () => {
    // TODO handle error
  };
  xhr.send();
}

export function getObjectCount (obj: any): number {
  let count = 0;

  for (let key in obj) {
    count++;
  }

  return count;
}
