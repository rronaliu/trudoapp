import Team from "./Team"
import Author from "./Author"

class News {
    constructor() {
      this.id = null
      this.title = ""
      this.tags = []
      this.author = new Author()
      this.team = new Team()
      this.publicationDate = new Date()
      this.removable = false
      this.description = ""
      this.content = ""
    }
    
    fromData(data, edit = false) {
      if(edit) {
        this.id = data.id
      } else {
        this.id = Math.floor(Math.random() * 100)
      }
        this.title = data.title
        this.tags = data.tags
        this.team = data.team
        this.author = data.author
        this.removable = data.removable
        this.removable = data.removable
        this.description = data.description
        this.content = data.content
    }
  }
  
  export default News;
  