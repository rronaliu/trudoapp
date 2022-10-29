class User {
    constructor() {
      this.id = null;
      this.firstName = ""
      this.lastName = ""
      this.userName = ""
      this.email = ""
    }
    
    fromData(data) {
        this.id = data.id
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.userName = data.userName
        this.email = data.email
    }
  }
  
  export default User;
  