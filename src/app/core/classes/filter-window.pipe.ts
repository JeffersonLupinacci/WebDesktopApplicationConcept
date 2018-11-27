import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterWindowPipe'
})
export class FilterWindowPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) { return []; }
        if (!searchText) { return items; }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.caption.toLowerCase().includes(searchText);
        });
    }
}
