export class SandboxSession {
  private closed = false;

  constructor(
    public readonly sandbox: { id: string },
    private readonly closer: () => Promise<void>,
  ) {}

  async close(): Promise<void> {
    if (this.closed) {
      return;
    }
    this.closed = true;
    await this.closer();
  }
}
