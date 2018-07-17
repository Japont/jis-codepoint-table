interface Info {
  men: number;
  ku: number;
  ten: number;
  level?: number;
  codePoint?: number | number[];
  fullwidth?: number;
  windows?: number;
}

declare var Table: Info[];

export { Info, Table };
