export const createLogger = (prefix = "[LOG]") => (event) =>
  () => console.log(`${prefix} Event:`, event); 