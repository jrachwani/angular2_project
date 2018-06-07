import {Pipe, PipeTransform} from '@angular/core';
/*@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(data: any[],field : string, searchTerm: string): any[] {
      
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        return item[field].indexOf(searchTerm) !== -1 
      });
       
  }
}*/


@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchTerm: string) {
    searchTerm = searchTerm.toUpperCase();
    if (!searchTerm) {
      return value;
    } else if (value) {
      return value.filter(item => {
        let StringValue: String;
        for (let key in item) {
          if(typeof item[key] != 'string'){
            StringValue = item[key].toString();
          }else{
            StringValue = item[key];
            StringValue = StringValue.toUpperCase();
          }
          
          if ((StringValue.indexOf(searchTerm) !== -1)) {
            return true;
          }
        }
      });
    }
  }
}