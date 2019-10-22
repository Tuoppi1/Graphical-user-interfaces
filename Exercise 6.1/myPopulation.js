import Population from "./Population"

class myPopulation{
    constructor(){
        let newPopulation = []
        let tmp = new Population("USA")
        for(var i=0;i<10;i++){
            newPopulation.push(tmp.nextPerson())
        }

        this.state={
            current:0,
            population:newPopulation
        }
    }

    getPopulation(){
        return this.state.population
    }

    getPerson(){
        return this.state.population[this.state.current]
    }

    save(person){
        this.state.population[this.state.current].setfirstName(person[0])
        this.state.population[this.state.current].setlastName(person[1])
        this.state.population[this.state.current].setbirthTown(person[2])
        this.state.population[this.state.current].setbirthCountry(person[3])
        this.state.population[this.state.current].setbirthYear(person[4])
        this.state.population[this.state.current].setmaritalStatus(person[5])

        console.log(this.state.population[this.state.current])
    }

    next(){
        if(this.state.current< 9){
            let n = this.state.current + 1
            this.state.current = n
        }
    }
    previous(){
        if(this.state.current>0){
            let n = this.state.current - 1
            this.state.current = n
        }
    }

    getInfo(){   
        return [
            this.state.population[this.state.current].getfirstName(),
            this.state.population[this.state.current].lastName,
            this.state.population[this.state.current].birthTown,
            this.state.population[this.state.current].birthCountry,
            this.state.population[this.state.current].birthYear,
            this.state.population[this.state.current].maritalStatus,
        ]
    }

}

export default myPopulation