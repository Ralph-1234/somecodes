import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from
'@angular/fire/firestore';

@Component({
  selector: 'app-rabies-case',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rabies-case.html',
  styleUrl: './rabies-case.css',
})
export class RabiesCase {
  title = signal('Rabies Case');

  date = signal('');
  patientName = signal('');
  age = signal<number | null>(null);
  gender = signal('');
  animalType = signal('');
  rabiesStatus = signal('');
  treatmentGiven = signal('');

  cases: any[] = [];

  constructor(private firestore: Firestore) {
    const daily_service_records = collection(this.firestore, 'rabies-cases');
    collectionData(daily_service_records, {idField: 'id'}).subscribe
    (data=>{
      this.cases = data;
    })
  }

  addPatient(){
    const date = this.date();
    const name = this.patientName();
    const age = this.age();
    const gender = this.gender();
    const animalType = this.animalType();
    const rabiesStatus = this.rabiesStatus();
    const treatment = this.treatmentGiven();
    if (date && name && age && gender && animalType && rabiesStatus && treatment) {
      const daily_service_records = collection(this.firestore, 'rabies-cases');
      addDoc(daily_service_records, {date,name,age,gender,animalType,rabiesStatus,treatment});
      this.date.set('');
      this.patientName.set('');
      this.age.set(null);
      this.gender.set('');
      this.animalType.set('');
      this.rabiesStatus.set('');
      this.treatmentGiven.set('');
    }
  }

  deletePatient(id: string){
    const patientDoc = doc(this.firestore, `rabies-cases/${id}`);
    deleteDoc(patientDoc);
  }

  updatePatient(id: string, newDate: string, newName: string, newAge: number, newGender: string, 
    newAnimalType: string, newRabiesStatus: string, newTreatment: string){
    const patientDoc = doc(this.firestore, `rabies-cases/${id}`);
    updateDoc(patientDoc, {date: newDate,name: newName, age: newAge, gender: newGender, 
      animalType: newAnimalType, rabiesStatus: newRabiesStatus, treatment: newTreatment});
    }
}
