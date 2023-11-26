export class ProxyConfig {
  proxyConfig!: Map<string, string>;

  deserialze(proxyData: ProxyConfig): ProxyConfig {
    this.proxyConfig = new Map<string, string>();
    for (const key in proxyData.proxyConfig) {
      if (proxyData.proxyConfig.hasOwnProperty(key)) {
        this.proxyConfig.set(key, (proxyData.proxyConfig as unknown as {[key: string]: string})[key]);
      }
    }
    return this;
  }
}
