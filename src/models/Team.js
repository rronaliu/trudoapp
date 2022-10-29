class Team {
    constructor() {
      this.id = null
      this.name = ""
    }
    
    fromData(data) {
        this.id = data.id
        this.name = data.name
    }
  }
  
  export default Team;
  