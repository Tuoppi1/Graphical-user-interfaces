const MaritalStatus = {"SINGLE": 0, "COHABITING": 1, "MARRIED_REGISTERED": 2, "WIDOW": 3};

class Person {
	constructor() {
		this.name = {first: null, last: null};
		this.birthDate = new Date();
		this.birthPlace = {town: null, country: null};
		this.marital = null;
	}
	
	toString() {
		let r = 
			(this.firstName!=null?this.firstName:"null") + " " + 
			(this.lastName!=null?this.lastName:"null") + ", born " +
			this.birthDay + "." + (this.birthMonth) + "." + this.birthYear + " in " +
			(this.birthTown!=null?this.birthTown:"null") + ", " + 
			(this.birthCountry!=null?this.birthCountry:"null");
		if (this.maritalStatus != null) {
			r += ", relationship status is ";
			switch (this.maritalStatus) {
				case MaritalStatus.COHABITING: 
					r += "living together";
					break;
				case MaritalStatus.MARRIED_REGISTERED: 
					r += "in registered relationship";
					break;
				case MaritalStatus.WIDOW: 
					r += "widowed";
					break;
				default: 
					r += "single";
			}
		}
		return r;
	}
	
	/**
	* Get the value of firstName
	*
	* @return the value of firstName
	*/
	getfirstName() {
		return this.firstName;
	}
	
	/**
	* Set the value of firstName
	*
	* @param firstName new value of firstName
	*/
	setfirstName(firstName) {
		this.firstName = firstName;
	}
	
	/**
	* Get the value of lastName
	*
	* @return the value of lastName
	*/
	getlastName() {
		return this.lastName;
	}
	
	/**
	* Set the value of lastName
	*
	* @param lastName new value of lastName
	*/
	setlastName(lastName) {
		this.lastName = lastName;
	}
	
	/**
	* Get the value of maritalStatus.
	*
	* @return the value of maritalStatus
	*/
	getmaritalStatus() {
		return this.maritalStatus;
	}
		
	/**
	* Set the value of maritalStatus
	*
	* @param status new value of maritalStatus
	*/
	setmaritalStatus(status) {
		this.maritalStatus = status;
	}
	
	/**
	* Get the value of birthCountry
	*
	* @return the value of birthCountry
	*/
	getbirthCountry() {
		return this.birthCountry;
	}
	
	/**
	* Set the value of birthCountry
	*
	* @param birthCountry new value of birthCountry
	*/
	setbirthCountry(birthCountry) {
		this.birthCountry = birthCountry;
	}
	
	/**
	* Get the value of birthTown
	*
	* @return the value of birthTown
	*/
	getbirthTown() {
		return this.birthTown;
	}
	
	/**
	* Set the value of birthTown
	*
	* @param birthTown new value of birthTown
	*/
	setbirthTown(birthTown) {
		this.birthTown = birthTown;
	}
	
	/**
	* Get the value of birth year.
	*
	* @return the year value of birthDate
	*/
	getbirthYear() {
		return this.birthYear
	}
	
	/**
	* Get the value of birth month, in range of 1..12.
	*
	* @return the month value of birthDate
	*/
	getbirthMonth() {
		return this.birthDate.getMonth() + 1;
	}
	
	/**
	* Get the value of birth date, i.e., the number of day of month.
	*
	* @return the day of month value of birthDate
	*/
	getbirthDay() {
		return this.birthDate.getDate();
	}
	
	/**
	* Set the year value of birthDate, other parts of the date remain the same.
	*
	* @param year int value of year to be set to birthDate
	*/
	setbirthYear(year) {
		this.birthYear = year;
	}
	
	/**
	* Set the year value of birthDate, other parts of the date remain the same.
	*
	* @param month int value of month in range 1..12 to be set to birthDate
	*/
	setbirthMonth(month) {
		this.birthMonth = month
	}
	
	/**
	* Set the day of month value of birthDate, other parts of the date remain the same.
	*
	* @param day int value of day to be set to birthDate
	*/
	setbirthDay(day) {
		this.birthDate = day
	}
}

export {MaritalStatus, Person};
