interface Config {
  urls: string;
}

declare module "myPackage" {
  function init(config: Config): boolean;
  function exit(count: number): number;
}
