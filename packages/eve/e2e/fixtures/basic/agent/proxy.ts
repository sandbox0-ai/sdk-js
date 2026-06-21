import {
  ProxyAgent,
  getGlobalDispatcher,
  setGlobalDispatcher,
  type Dispatcher,
} from "undici";

const proxyUrl = process.env.HTTPS_PROXY
  ?? process.env.https_proxy
  ?? process.env.HTTP_PROXY
  ?? process.env.http_proxy;

if (proxyUrl) {
  const direct = getGlobalDispatcher();
  const proxy = new ProxyAgent(proxyUrl);

  setGlobalDispatcher({
    dispatch(options, handler) {
      return shouldBypassProxy(options.origin)
        ? direct.dispatch(options, handler)
        : proxy.dispatch(options, handler);
    },
    close() {
      return proxy.close();
    },
    destroy(error) {
      proxy.destroy(error);
    },
  } as Dispatcher);
}

function shouldBypassProxy(origin: unknown): boolean {
  const hostname = getHostname(origin);
  if (!hostname) {
    return false;
  }
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
    return true;
  }
  const noProxy = `${process.env.NO_PROXY ?? ""},${process.env.no_proxy ?? ""}`;
  return noProxy
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .some((entry) => hostname === entry || hostname.endsWith(`.${entry}`));
}

function getHostname(origin: unknown): string | undefined {
  if (typeof origin === "string") {
    return new URL(origin).hostname;
  }
  if (origin instanceof URL) {
    return origin.hostname;
  }
  return undefined;
}
