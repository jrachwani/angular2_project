import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'SearchBoxFilterPipe',
})
export class SearchBoxFilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
              // alert(el.toLowerCase().indexOf(input));
                return el.toLowerCase().indexOf(input) > -1;
            })
            // value.
        }
        return value;
    }
}