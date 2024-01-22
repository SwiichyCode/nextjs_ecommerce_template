export class UndefinedSessionMedataError extends Error {
  constructor() {
    super("session metadata is not defined");
  }
}
