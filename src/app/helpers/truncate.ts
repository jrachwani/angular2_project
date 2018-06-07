import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform{
  transform(value: string) : any {
  
        if(value.indexOf(".") > 0){
            if(value.indexOf("%")>0){
                return parseFloat(value).toFixed(2) + "%";
            }
            else
            {
                return Number(parseFloat(value).toFixed(2));
            }
        }
        else {
            return value;
        }
  }
}