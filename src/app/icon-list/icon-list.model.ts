export interface Icon {
  name: string;
  svg: string;
  width: number;
}

export interface ColorButton {
  name: string;
  color: string;
}

export interface IconSize {
  name: string;
  value: number;
}

export interface GroupedIcons {
  width: number;
  icons: Icon[];
  opened: boolean;
}
