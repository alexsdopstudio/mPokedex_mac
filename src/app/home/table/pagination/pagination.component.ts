import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginated } from '../../../dataTypes/paginatedResponse';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent { 
  @Input() data$: Observable<Paginated> | undefined;


}
