import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    Material.MatButtonModule, Material.MatCheckboxModule, Material.MatMenuModule,
        Material.MatExpansionModule, Material.MatToolbarModule, Material.MatSidenavModule,
        Material.MatIconModule, Material.MatListModule, Material.MatGridListModule,
        Material.MatCardModule, Material.MatChipsModule,  Material.MatInputModule,
       Material.MatSelectModule, Material.MatRadioModule, Material.MatFormFieldModule,
       Material.MatTabsModule,Material.MatButtonToggleModule,Material.MatProgressSpinnerModule,
       Material.MatRadioModule,Material.MatOptionModule,Material.MatAutocompleteModule
  ],
  exports: [ Material.MatButtonModule, Material.MatCheckboxModule, Material.MatMenuModule,
    Material.MatExpansionModule, Material.MatToolbarModule, Material.MatSidenavModule,
    Material.MatIconModule, Material.MatListModule, Material.MatGridListModule,
    Material.MatCardModule, Material.MatChipsModule, Material.MatInputModule,
   Material.MatSelectModule, Material.MatRadioModule,Material.MatFormFieldModule,
   Material.MatTabsModule,Material.MatButtonToggleModule,Material.MatProgressSpinnerModule,
   Material.MatRadioModule,Material.MatOptionModule,Material.MatAutocompleteModule
  ]
})
export class MaterialModule { }
