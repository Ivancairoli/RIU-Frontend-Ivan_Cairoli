import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MaterialModule } from '../../../../compartido/material/material.module';

@Component({
  selector: 'app-dashboard-ingreso',
  imports: [MaterialModule, RouterLink],
  templateUrl: './dashboard-ingreso.component.html',
  styleUrl: './dashboard-ingreso.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardIngresoComponent {}
