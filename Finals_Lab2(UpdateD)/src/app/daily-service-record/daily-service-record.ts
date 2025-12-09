import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from
'@angular/fire/firestore';

@Component({
  selector: 'app-daily-service-record',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-service-record.html',
  styleUrl: './daily-service-record.css',
})
export class DailyServiceRecord {
  title = signal('Daily Service Record');

  date = signal('');
  patientName = signal('');
  age = signal<number | null>(null);
  gender = signal('');
  sicknessDiagnosed = signal('');
  treatmentProvided = signal('');
  attendingPhysician = signal('');

  patients: any[] = [];

  constructor(private firestore: Firestore) {
    const daily_service_records = collection(this.firestore, 'daily_service_records');
    collectionData(daily_service_records, {idField: 'id'}).subscribe
    (data=>{
      this.patients = data;
    })
  }

  addPatient(){
    const date = this.date();
    const name = this.patientName();
    const age = this.age();
    const gender = this.gender();
    const sickness = this.sicknessDiagnosed();
    const treatment = this.treatmentProvided();
    const physician = this.attendingPhysician();
    if (date && name && age && gender && sickness && treatment && physician) {
      const daily_service_records = collection(this.firestore, 'daily_service_records');
      addDoc(daily_service_records, {date,name,age,gender,sickness,treatment,physician});
      this.date.set('');
      this.patientName.set('');
      this.age.set(null);
      this.gender.set('');
      this.sicknessDiagnosed.set('');
      this.treatmentProvided.set('');
      this.attendingPhysician.set('');
    }
  }

  deletePatient(id: string){
    const patientDoc = doc(this.firestore, `daily_service_records/${id}`);
    deleteDoc(patientDoc);
  }

  updatePatient(id: string, newDate: string, newName: string, newAge: number, newGender: string, 
    newSickness: string, newTreatment: string, newPhysician: string){
    const patientDoc = doc(this.firestore, `daily_service_records/${id}`);
    updateDoc(patientDoc, {date: newDate,name: newName, age: newAge, gender: newGender, 
      sickness: newSickness, treatment: newTreatment, physician: newPhysician});
    }
}
