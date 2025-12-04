import { Routes } from '@angular/router';
import { DailyServiceRecord } from './daily-service-record/daily-service-record';
import { RabiesCase } from './rabies-case/rabies-case';
import { WaterAnalysis } from './water-analysis/water-analysis';

export const routes: Routes = [
    {path: '',component: DailyServiceRecord},
    {path: 'Rabies-Case',component: RabiesCase},
    {path: 'Water-Analysis',component: WaterAnalysis}
];
