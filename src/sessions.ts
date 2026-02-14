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

export class VolumeSession {
  private closed = false;

  constructor(
    public readonly volume: { id: string },
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

export class MountSession {
  private closed = false;

  constructor(
    public readonly volumeId: string,
    public readonly mountPoint: string,
    public readonly mountSessionId: string,
    private readonly unmount: () => Promise<void>,
  ) {}

  async close(): Promise<void> {
    if (this.closed) {
      return;
    }
    this.closed = true;
    await this.unmount();
  }
}
