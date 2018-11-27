import { WindowPosition } from './window-position';

export interface WindowForm {
    width: number;
    height: number;
    onResize(position: WindowPosition);
}
