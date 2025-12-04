import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from
'@angular/fire/firestore';

@Component({
  selector: 'app-water-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './water-analysis.html',
  styleUrl: './water-analysis.css',
})
export class WaterAnalysis {
  title = signal('Water Analysis ');

  date = signal('');
  sourceAddress = signal('');
  waterStatus = signal('');
  remarks = signal('');

  results: any[] = [];

  constructor(private firestore: Firestore) {
    const daily_service_records = collection(this.firestore, 'water_analysis_results');
    collectionData(daily_service_records, {idField: 'id'}).subscribe
    (data=>{
      this.results = data;
    })
  }

  addPatient(){
    const date = this.date();
    const sourceAddress = this.sourceAddress();
    const waterStatus = this.waterStatus();
    const remarks = this.remarks();
    if (date && sourceAddress && waterStatus && remarks) {
      const daily_service_records = collection(this.firestore, 'water_analysis_results');
      addDoc(daily_service_records, {date,sourceAddress,waterStatus,remarks});
      this.date.set('');
      this.sourceAddress.set('');
      this.waterStatus.set('');
      this.remarks.set('');
    }
  }

  deletePatient(id: string){
    const patientDoc = doc(this.firestore, `water_analysis_results/${id}`);
    deleteDoc(patientDoc);
  }

  updatePatient(id: string, newDate: string, newSourceAddress: string, newWaterStatus: number, newRemarks: string){
    const patientDoc = doc(this.firestore, `water_analysis_results/${id}`);
    updateDoc(patientDoc, {date: newDate,sourceAddress: newSourceAddress, waterStatus: newWaterStatus, remarks: newRemarks});
    }
}
