import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SkeletonModule } from 'primeng/skeleton'
import { TableModule } from 'primeng/table'

@Component({
  selector: 'app-table-skeleton',
  imports: [TableModule, SkeletonModule],
  templateUrl: './table-skeleton.component.html',
  styleUrl: './table-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSkeletonComponent {
  @Input({ required: true }) tableColumns: string[] = []
  @Input({ required: true }) tableRows: number[] = []
}
