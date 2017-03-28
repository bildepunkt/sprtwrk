export function assignArgs (obj: object, args: any): void {
  for (var key in args) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = args[key];
    }
  }
}
