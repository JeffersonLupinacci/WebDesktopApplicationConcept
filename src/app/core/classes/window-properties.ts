import { WindowCursor } from './window-cursor.enum';

export class WindowProperties {
    floatingMenuVisible: Boolean = false;
    maximized: Boolean = false;
    minimized: Boolean = false;
    focused: Boolean = false;
    caption = '';
    mouseX = 0;
    mouseY = 0;
    elementX = 0;
    elementY = 0;
    icon: string;
    iconColor: string;
    cursor: WindowCursor;
    cursorCSS: string;

    setCursor(cursor: WindowCursor) {
        this.cursor = cursor;
        switch (cursor) {
            case WindowCursor.DEFAULT_CURSOR: {
                this.cursorCSS = 'default';
                break;
            }
            case WindowCursor.BOTTOM_CURSOR: {
                this.cursorCSS = 'ns-resize';
                break;
            }
            case WindowCursor.LEFT_CURSOR: {
                this.cursorCSS = 'ew-resize';
                break;
            }
            case WindowCursor.RIGHT_CURSOR: {
                this.cursorCSS = 'ew-resize';
                break;
            }
            case WindowCursor.LEFTBOTTOM_CURSOR: {
                this.cursorCSS = 'sw-resize';
                break;
            }
            case WindowCursor.RIGHTBOTTOM_CURSOR: {
                this.cursorCSS = 'se-resize';
                break;
            }
        }
    }
}
