type Mods = Record<string, boolean | string>;

export function classNames(cls: string, mods: Mods = {}, additioal: string[] = []): string {
  return [
    cls,
    ...additioal.filter(Boolean),
    ...Object.keys(mods).filter(key => mods[key])
  ].join(' ');
}
