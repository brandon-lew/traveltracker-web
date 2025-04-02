import { Component, OnInit } from '@angular/core';

// INTERFACES
import { ICountry } from '../interfaces/country.model';

// SERVICES
import { CountriesService } from '../services/countries.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  alertMessage: boolean = false;
  errorMessage!: string;
  selectedCountries!: Array<string>;
  countries!: ICountry[];

  constructor(
    private countriesService: CountriesService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    // if there is local storage data, update selectedCountries array with data
    if (this.localStorageService.get('Visited') !== null) {
      this.selectedCountries = this.localStorageService.get('Visited');
    }
    // import countries json data
    this.countriesService.getCountries().subscribe({
      next: (data: ICountry[]) => {
        // sort countries alphabetically by name
        data.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        // add 'checked' property for selectedCountries from local storage
        for (const countriesKey of data) {
          for (const selectedCountriesKey of this.selectedCountries) {
            if (countriesKey.name === selectedCountriesKey) {
              countriesKey['checked'] = true;
            }
          }
        }
        this.countries = data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  // ON CHANGE CONTINENT DROPDOWN SELECT
  continentChange(selectedContinent: string) {
    // import countries json data
    this.countriesService.getCountries().subscribe({
      next: (data: ICountry[]) => {
        // sort countries alphabetically by name
        data.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });

        if (selectedContinent !== 'All') {
          const list = [];
          for (let x = 0; x < data.length; x++) {
            if (selectedContinent === data[x].continent) {
              // add 'checked' property for selectedCountries from local storage
              for (const countriesKey of data) {
                for (const selectedCountriesKey of this.selectedCountries) {
                  if (countriesKey.name === selectedCountriesKey) {
                    countriesKey['checked'] = true;
                  }
                }
              }
              list.push(data[x]);
              this.countries = list;
            }
          }
        } else {
          // add 'checked' property for selectedCountries from local storage
          for (const countriesKey of data) {
            for (const selectedCountriesKey of this.selectedCountries) {
              if (countriesKey.name === selectedCountriesKey) {
                countriesKey['checked'] = true;
              }
            }
          }
          this.countries = data;
        }
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  // ON CLICK OF RESET BUTTON
  resetData(): void {
    this.alertMessage = true;
  }

  // ON CLICK OF CANCEL BUTTON
  cancelReset(): void {
    this.alertMessage = false;
  }

  // ON CLICK OF CONFIRM BUTTON
  confirmReset(): void {
    // reset 'visited' data
    this.saveData('Visited', []);
    // reset component
    this.alertMessage = false;
    this.ngOnInit();
  }

  // ON CHANGE OF COUNTRY CHECKBOX
  countryChange(name: string, isChecked: boolean) {
    // update selected countries data to local storage
    if (isChecked) {
      this.selectedCountries.push(name);
      this.saveData('Visited', this.selectedCountries);
    } else {
      const index = this.selectedCountries.indexOf(name);
      this.selectedCountries.splice(index, 1);
      this.saveData('Visited', this.selectedCountries);
    }
  }

  // ON KEYPRESS OF COUNTRY BUTTON
  countryKeypress(
    event: { preventDefault: () => void; keyCode: number },
    country: string
  ) {
    event.preventDefault();
    const isEnterOrSpace = event.keyCode === 32 || event.keyCode === 13;
    if (isEnterOrSpace) {
      const elem = document.getElementById(country);
      elem?.click();
    }
  }

  // SAVE DATA TO LOCAL STORAGE METHOD
  saveData(key: string, value: Array<string>) {
    this.localStorageService.set(key, value);
  }
}
